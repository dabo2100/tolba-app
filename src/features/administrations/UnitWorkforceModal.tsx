import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import WorkforceModal from '../workforce/WorkforceModal'

export default function UnitWorkforceModal({
  unit, adminStaff, onClose,
}: {
  unit: { name: string; type: string; staff: number; active: boolean }
  adminStaff: number
  onClose: () => void
}) {
  const { wf: workforce, workforceSpecializations } = useAppData()
  const scale = adminStaff > 0 ? unit.staff / adminStaff : 0
  const [specModal, setSpecModal] = useState<{ label: string; total: number } | null>(null)

  const unitWorkforce = workforce.map(w => ({
    ...w,
    count: Math.max(1, Math.round(w.administration * scale)),
  }))
  const totalUnitStaff = unitWorkforce.reduce((s, w) => s + w.count, 0)

  const doctorBreakdowns = [
    { name: 'جراحة عامة', count: 0 }, { name: 'نساء وتوليد', count: 0 },
    { name: 'باطنة', count: 0 }, { name: 'أطفال', count: 0 },
    { name: 'عيون', count: 0 }, { name: 'أسنان', count: 0 },
  ].map((s, i) => {
    const docTotal = unitWorkforce.find(w => w.label === 'أطباء بشري')?.count ?? 0
    const shares = [22, 18, 16, 14, 12, 10]
    const rest = 100 - shares.reduce((a, b) => a + b, 0)
    const pct = i < shares.length ? shares[i] : rest
    return { name: s.name, count: Math.max(1, Math.round(docTotal * pct / 100)) }
  })

  const techBreakdowns = [
    { name: 'فني معمل', share: 22 }, { name: 'فني أشعة', share: 18 },
    { name: 'فني تخدير', share: 16 }, { name: 'فني أسنان', share: 14 },
    { name: 'فني طوارئ', share: 14 }, { name: 'فني صيانة', share: 16 },
  ].map(s => {
    const techTotal = unitWorkforce.find(w => w.label === 'فنيون')?.count ?? 0
    return { name: s.name, count: Math.max(1, Math.round(techTotal * s.share / 100)) }
  })

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 860,
        maxHeight: '92vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)', overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
          padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏥</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>{unit.name}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#ddd6fe', background: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: 20 }}>{unit.type}</span>
                <span style={{ fontSize: 11, color: unit.active ? '#86efac' : '#fde68a' }}>● {unit.active ? 'نشط' : 'تحت الصيانة'}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
            {[
              { label: 'إجمالي الكوادر', val: totalUnitStaff, icon: '👥' },
              { label: 'أطباء وفنيون', val: (unitWorkforce.find(w=>w.label==='أطباء بشري')?.count??0)+(unitWorkforce.find(w=>w.label==='فنيون')?.count??0), icon: '⚕️' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: 9, color: '#ddd6fe', marginBottom: 3 }}>{s.icon} {s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{s.val.toLocaleString('ar-EG')}</div>
              </div>
            ))}
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, color: '#fff',
          }}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Workforce Grid */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 14, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} />
              توزيع الكوادر البشرية
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {unitWorkforce.map(w => {
                const hasSpec = !!workforceSpecializations[w.label]
                return (
                  <div key={w.label}
                    onClick={() => hasSpec && setSpecModal({ label: w.label, total: w.count })}
                    style={{
                      background: `${w.color}08`, border: `1.5px solid ${w.color}20`,
                      borderRadius: 12, padding: '14px 12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      cursor: hasSpec ? 'pointer' : 'default', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (hasSpec) { e.currentTarget.style.background = `${w.color}14`; e.currentTarget.style.borderColor = `${w.color}45` } }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${w.color}08`; e.currentTarget.style.borderColor = `${w.color}20` }}
                  >
                    <div style={{ fontSize: 22 }}>{w.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: w.color, lineHeight: 1 }}>{w.count.toLocaleString('ar-EG')}</div>
                    <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', fontWeight: 600 }}>{w.label}</div>
                    {hasSpec && <div style={{ fontSize: 9, color: w.color, opacity: 0.7 }}>اضغط للتفاصيل ▼</div>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Doctors Detail */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 14, background: '#0369a1', borderRadius: 2, display: 'inline-block' }} />
              تفاصيل الأطباء البشريين حسب التخصص
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', background: '#f1f5f9', padding: '9px 16px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>التخصص</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', textAlign: 'center' }}>العدد</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textAlign: 'center' }}>النسبة</div>
              </div>
              {doctorBreakdowns.map((d, i) => {
                const docTotal = unitWorkforce.find(w => w.label === 'أطباء بشري')?.count ?? 1
                const pct = Math.round((d.count / docTotal) * 100)
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 90px 90px',
                    padding: '10px 16px', borderBottom: i < doctorBreakdowns.length - 1 ? '1px solid #f1f5f9' : 'none',
                    alignItems: 'center',
                    background: i % 2 === 0 ? '#fff' : '#fafbff',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 2, background: '#0369a1', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{d.name}</span>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#0369a1', background: '#e0f2fe', borderRadius: 7, padding: '3px 6px' }}>
                      {d.count}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 40, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#0369a1', borderRadius: 3, width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Technicians Detail */}
          <div style={{ padding: '18px 22px 22px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 14, background: '#ea580c', borderRadius: 2, display: 'inline-block' }} />
              تفاصيل الفنيين حسب التخصص
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', background: '#f1f5f9', padding: '9px 16px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>التخصص</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#ea580c', textAlign: 'center' }}>العدد</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textAlign: 'center' }}>النسبة</div>
              </div>
              {techBreakdowns.map((t, i) => {
                const techTotal = unitWorkforce.find(w => w.label === 'فنيون')?.count ?? 1
                const pct = Math.round((t.count / techTotal) * 100)
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 90px 90px',
                    padding: '10px 16px', borderBottom: i < techBreakdowns.length - 1 ? '1px solid #f1f5f9' : 'none',
                    alignItems: 'center',
                    background: i % 2 === 0 ? '#fff' : '#fafbff',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 2, background: '#ea580c', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{t.name}</span>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#ea580c', background: '#ffedd5', borderRadius: 7, padding: '3px 6px' }}>
                      {t.count}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 40, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#ea580c', borderRadius: 3, width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {specModal && <WorkforceModal category={specModal.label} total={specModal.total} onClose={() => setSpecModal(null)} />}
    </div>
  )
}
