import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import FormField from '../../components/common/FormField'
import SaveBtn from '../../components/common/SaveBtn'
import EntryHeader from '../../components/common/EntryHeader'
import WorkforceDetailSection from '../workforce/WorkforceDetailSection'
import { categoryTotal, initWfDetail, type WfDetail } from '../workforce/detailModel'

export default function HospitalDataEntry({ hospIdx }: { hospIdx: number }) {
  const { hosps, updateHosp, wf, logChange, directorateUnits, workforceSpecializations } = useAppData()
  const h = hosps[hospIdx]
  const totalHospBeds = hosps.reduce((s, x) => s + x.beds, 0) || 1
  const totalWfH = wf.reduce((s, w) => s + w.hospital, 0) || 1
  const wfScale = h.staff / totalWfH
  const bedsScale = h.beds / totalHospBeds

  const [hospUnits, setHospUnits] = useState(() =>
    directorateUnits.map((u, i) => {
      const total = Math.max(1, Math.round(u.dirTotal * bedsScale))
      const occPct = Math.min(97, Math.max(35, u.occBase + ((hospIdx * 7 + i * 11) % 17) - 8))
      const occupied = Math.round(total * occPct / 100)
      return { ...u, total, occupied }
    })
  )

  const [form, setForm] = useState({ staff: h.staff, beds: h.beds })
  const [detail, setDetail] = useState<Record<string, WfDetail>>(() => initWfDetail(wfScale, workforceSpecializations))
  const [unitCaps, setUnitCaps] = useState<Record<string, number>>(() =>
    Object.fromEntries(directorateUnits.map(u => [u.label, Math.max(1, Math.round(u.dirTotal * bedsScale))]))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  const wfTotal = wf.reduce((s, w) => s + categoryTotal(detail[w.label], 0), 0)
  const diff = form.staff - wfTotal

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    try {
      await updateHosp(h.id, { staff: Number(form.staff), beds: Number(form.beds) })
      await logChange(h.name, `تحديث بيانات ${h.name}: ${form.staff} كادر`)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setSaveError('تعذر حفظ بيانات المستشفى. حاول مرة أخرى.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <EntryHeader title={h.name} subtitle={`مستشفى ${h.type} · إدخال وتعديل البيانات`} icon="🏥" color="#0369a1" />

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 18px', color: '#16a34a', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ تم حفظ البيانات بنجاح وتحديث الإجمالي العام
        </div>
      )}

      {saveError && <div role="alert" style={{ padding: 12, color: '#dc2626', background: '#fef2f2', borderRadius: 10 }}>{saveError}</div>}

      {/* Basic Info */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0369a1', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0369a1', borderRadius: 2, display: 'inline-block' }} /> بيانات المستشفى الأساسية
        </div>
        <div className="form-grid-2" style={{ gap: 14 }}>
          <FormField label="المدير" value={h.manager} readOnly type="text" />
          <FormField label="إجمالي القوى البشرية" value={form.staff} onChange={v => setForm(p => ({ ...p, staff: Number(v) }))} />
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: diff === 0 ? '#16a34a' : '#dc2626', fontWeight: 700, padding: '10px 14px', background: diff === 0 ? '#f0fdf4' : '#fef2f2', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {diff === 0 ? '✅ إجمالي التوزيع التفصيلي متطابق مع الكادر الإجمالي' : diff > 0 ? `⚠ يتبقى ${diff} موظف لم يُوزَّع على التخصصات` : `⚠ التوزيع يتجاوز الإجمالي بـ ${Math.abs(diff)} موظف`}
          <strong style={{ marginRight: 'auto' }}>{wfTotal.toLocaleString('ar-EG')} / {form.staff.toLocaleString('ar-EG')}</strong>
        </div>
      </div>

      {/* Clinical Units */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#d97706', borderRadius: 2, display: 'inline-block' }} /> الطاقة السريرية والوحدات
        </div>
        <div className="form-grid-4" style={{ gap: 14 }}>
          {directorateUnits.map(u => (
            <div key={u.label} style={{ background: `${u.color}08`, border: `1.5px solid ${u.color}22`, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{u.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#374151', lineHeight: 1.3 }}>{u.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="number" value={unitCaps[u.label] ?? 0}
                  onChange={e => setUnitCaps(p => ({ ...p, [u.label]: Number(e.target.value) }))}
                  style={{ flex: 1, padding: '7px 8px', border: `1.5px solid ${u.color}30`, borderRadius: 7, fontSize: 17, fontWeight: 900, color: u.color, fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#fff' }}
                />
                <span style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{u.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Occupancy Rates — editable with total/occupied/available */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>📊 نسب الإشغال</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#bae6fd' }}>
            <span>🔵 الإجمالي</span><span>🔴 المشغول</span><span>🟢 المتاح</span>
          </div>
        </div>
        <div className="form-grid-4" style={{ padding: 20 }}>
          {hospUnits.map((u, i) => {
            const safeTotal = Number.isFinite(u.total) ? u.total : 0
            const safeOccupied = Number.isFinite(u.occupied) ? Math.min(u.occupied, safeTotal) : 0
            const available = Math.max(0, safeTotal - safeOccupied)
            const pct = safeTotal > 0 ? Math.round((safeOccupied / safeTotal) * 100) : 0
            const color = pct > 85 ? '#dc2626' : pct > 65 ? '#d97706' : '#16a34a'
            return (
              <div key={u.label} style={{ background: '#f8fafc', borderRadius: 14, border: `1.5px solid ${color}25`, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{u.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', lineHeight: 1.3 }}>{u.label}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{u.unit}</div>
                  </div>
                  {/* Pct badge */}
                  <div style={{ marginRight: 'auto', textAlign: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color }}>{pct}%</div>
                    </div>
                  </div>
                </div>

                {/* Three fields */}
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Total */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0369a1', minWidth: 50 }}>الإجمالي</span>
                    <input
                      type="number" min={0} value={safeTotal}
                      onChange={e => {
                        const total = Math.max(0, Number(e.target.value) || 0)
                        setHospUnits(p => p.map((x, j) => j === i ? { ...x, total, occupied: Math.min(x.occupied ?? 0, total) } : x))
                      }}
                      style={{ flex: 1, padding: '5px 8px', border: '1.5px solid #bae6fd', borderRadius: 7, fontSize: 14, fontWeight: 800, color: '#0369a1', fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#eff6ff' }}
                      onFocus={e => (e.target.style.borderColor = '#0369a1')}
                      onBlur={e => (e.target.style.borderColor = '#bae6fd')}
                    />
                  </div>
                  {/* Occupied */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color, minWidth: 50 }}>المشغول</span>
                    <input
                      type="number" min={0} max={safeTotal} value={safeOccupied}
                      onChange={e => {
                        const occupied = Math.min(safeTotal, Math.max(0, Number(e.target.value) || 0))
                        setHospUnits(p => p.map((x, j) => j === i ? { ...x, occupied } : x))
                      }}
                      style={{ flex: 1, padding: '5px 8px', border: `1.5px solid ${color}55`, borderRadius: 7, fontSize: 14, fontWeight: 800, color, fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#fff' }}
                      onFocus={e => (e.target.style.borderColor = color)}
                      onBlur={e => (e.target.style.borderColor = `${color}55`)}
                    />
                  </div>
                  {/* Available — read-only */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', minWidth: 50 }}>المتاح</span>
                    <div style={{ flex: 1, padding: '5px 8px', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 7, fontSize: 14, fontWeight: 900, color: '#16a34a', textAlign: 'center' }}>
                      {available.toLocaleString('ar-EG')}
                    </div>
                  </div>
                </div>

                {/* Bar */}
                <div style={{ margin: '0 14px 12px', height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: color, width: `${pct}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detailed Workforce */}
      <WorkforceDetailSection wf={wf} detail={detail} setDetail={setDetail} accentColor="#7c3aed" />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={handleSave} saving={saving} />
      </div>
    </div>
  )
}
