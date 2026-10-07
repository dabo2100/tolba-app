import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import { unitNames } from '../../data/reference'
import FormField from '../../components/common/FormField'
import SaveBtn from '../../components/common/SaveBtn'
import EntryHeader from '../../components/common/EntryHeader'
import WorkforceDetailSection from '../workforce/WorkforceDetailSection'
import { initWfDetail, type WfDetail } from '../workforce/detailModel'

export default function AdminDataEntry({ adminIdx, isSuperAdmin }: { adminIdx: number; isSuperAdmin?: boolean }) {
  const { admins, updateAdmin, wf, logChange, workforceSpecializations } = useAppData()
  const a = admins[adminIdx]
  const totalWfAdmin = wf.reduce((s, w) => s + w.administration, 0) || 1
  const wfScale = a.staff / totalWfAdmin
  const [form, setForm] = useState({ staff: a.staff, units: a.units })
  const [detail, setDetail] = useState<Record<string, WfDetail>>(() => initWfDetail(wfScale, workforceSpecializations))
  const [subUnits, setSubUnits] = useState(() =>
    Array.from({ length: a.units }, (_, i) => ({
      name: `مركز صحي ${unitNames[i] ?? `رقم ${i + 1}`}`,
      type: i % 3 === 0 ? 'وحدة صحية' : i % 3 === 1 ? 'مركز صحي' : 'عيادة',
      staff: Math.round(a.staff / a.units),
      active: i !== 4,
    }))
  )
  const [newUnit, setNewUnit] = useState({ name: '', type: 'مركز صحي', staff: 0, active: true })
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    try {
      await updateAdmin(a.id, { staff: Number(form.staff), units: subUnits.length })
      await logChange(`إدارة ${a.name}`, `تحديث بيانات إدارة ${a.name}: ${form.staff} كادر، ${subUnits.length} وحدة`)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setSaveError('تعذر حفظ بيانات الإدارة. حاول مرة أخرى.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <EntryHeader title={`إدارة ${a.name} الصحية`} subtitle="إدخال وتعديل بيانات الإدارة والوحدات الصحية" icon="🏢" color="#7c3aed" />

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 18px', color: '#16a34a', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ تم حفظ بيانات الإدارة وتحديث الإجمالي العام
        </div>
      )}

      {saveError && <div role="alert" style={{ padding: 12, color: '#dc2626', background: '#fef2f2', borderRadius: 10 }}>{saveError}</div>}

      {/* Basic stats */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#7c3aed', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} /> بيانات الإدارة
        </div>
        <div className="form-grid-3" style={{ gap: 14 }}>
          <FormField label="اسم الإدارة" value={a.name} readOnly type="text" />
          <FormField label="المدير" value={a.manager} readOnly type="text" />
          <FormField label="عدد الوحدات" value={subUnits.length} readOnly />
          <FormField label="إجمالي الكوادر" value={form.staff}
            onChange={v => setForm(p => ({ ...p, staff: Number(v) }))} />
        </div>
      </div>

      {/* Sub-units management */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#5b21b6,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>الوحدات الصحية ({subUnits.length})</div>
          {isSuperAdmin && (
            <button onClick={() => setShowAdd(!showAdd)} style={{
              padding: '6px 16px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
            }}>+ إضافة وحدة</button>
          )}
        </div>

        {isSuperAdmin && showAdd && (
          <div className="units-row-add" style={{ padding: '14px 20px', background: '#faf5ff', borderBottom: '1px solid #ede9fe' }}>
            <FormField label="اسم الوحدة" value={newUnit.name} type="text" onChange={v => setNewUnit(p => ({ ...p, name: v }))} />
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>النوع</label>
              <select value={newUnit.type} onChange={e => setNewUnit(p => ({ ...p, type: e.target.value }))} style={{ padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 12, fontFamily: 'Cairo, sans-serif', width: '100%', outline: 'none' }}>
                {['وحدة صحية', 'مركز صحي', 'عيادة'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <FormField label="الكوادر" value={newUnit.staff} onChange={v => setNewUnit(p => ({ ...p, staff: Number(v) }))} />
            <button onClick={() => { if (newUnit.name) { setSubUnits(p => [...p, { ...newUnit }]); setNewUnit({ name: '', type: 'مركز صحي', staff: 0, active: true }); setShowAdd(false) } }}
              style={{ padding: '9px 18px', background: '#7c3aed', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', height: 38, alignSelf: 'end' }}>
              إضافة
            </button>
          </div>
        )}

        <div style={{ maxHeight: 340, overflowY: 'auto' }}>
          {subUnits.map((u, i) => (
            <div key={i} className="units-row" style={{ padding: '11px 20px', borderBottom: i < subUnits.length - 1 ? '1px solid #f8fafc' : 'none' }}>
              {isSuperAdmin ? (
                <input value={u.name} onChange={e => setSubUnits(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                  style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12, fontFamily: 'Cairo, sans-serif', outline: 'none' }} />
              ) : (
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{u.name}</div>
              )}
              <span style={{ fontSize: 11, color: '#64748b', background: '#f1f5f9', borderRadius: 6, padding: '4px 10px', textAlign: 'center' }}>{u.type}</span>
              {isSuperAdmin ? (
                <input type="number" value={u.staff} onChange={e => setSubUnits(p => p.map((x, j) => j === i ? { ...x, staff: Number(e.target.value) } : x))}
                  style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, fontWeight: 700, color: '#7c3aed', fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center' }} />
              ) : (
                <div style={{ background: '#f5f3ff', borderRadius: 7, padding: '4px 10px', fontSize: 13, fontWeight: 700, color: '#7c3aed', textAlign: 'center' }}>{u.staff}</div>
              )}
              <button onClick={() => isSuperAdmin && setSubUnits(p => p.map((x, j) => j === i ? { ...x, active: !x.active } : x))}
                style={{ padding: '4px 12px', borderRadius: 20, border: 'none', cursor: isSuperAdmin ? 'pointer' : 'default', fontSize: 11, fontWeight: 700, fontFamily: 'Cairo, sans-serif', background: u.active ? '#dcfce7' : '#fef3c7', color: u.active ? '#16a34a' : '#d97706' }}>
                {u.active ? 'نشط' : 'معطّل'}
              </button>
              {isSuperAdmin ? (
                <button onClick={() => setSubUnits(p => p.filter((_, j) => j !== i))}
                  style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              ) : (
                <div />
              )}
            </div>
          ))}
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
