import { useState } from 'react'
import type { DiwanDept } from '../../domain/models'
import { useAppData } from '../../state/AppDataContext'
import WorkforceModal from '../workforce/WorkforceModal'

export default function DiwanDeptModal({ dept, totalDiwanStaff, onClose }: {
  dept: DiwanDept; totalDiwanStaff: number; onClose: () => void
}) {
  const [specModal, setSpecModal] = useState<{ label: string; total: number } | null>(null)
  const { wf: workforce, workforceSpecializations } = useAppData()
  const totalWfDirectorate = workforce.reduce((s, w) => s + w.directorate, 0)
  const scale = totalWfDirectorate > 0 ? dept.staff / totalWfDirectorate : 0
  const deptWf = workforce.map(w => ({
    ...w,
    val: Math.max(1, Math.round(w.directorate * scale)),
  }))
  const deptTotal = deptWf.reduce((s, w) => s + w.val, 0)
  const isAdmin = dept.type === 'إدارية'
  const accentColor = isAdmin ? '#d97706' : '#0d9488'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 820,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28)', overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: isAdmin
            ? 'linear-gradient(135deg, #78350f 0%, #d97706 100%)'
            : 'linear-gradient(135deg, #064e3b 0%, #0d9488 100%)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', left: 60, bottom: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>{dept.icon}</div>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 3 }}>
                {isAdmin ? 'إدارة إدارية' : 'إدارة فنية'} · ديوان المديرية
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{dept.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>
                رئيس الإدارة: <strong style={{ color: '#fff' }}>{dept.head}</strong>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '10px 18px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{dept.staff}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>إجمالي الكوادر</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '10px 18px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
                {totalDiwanStaff > 0 ? ((dept.staff / totalDiwanStaff) * 100).toFixed(1) : '0'}%
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>من إجمالي الديوان</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, color: '#fff', backdropFilter: 'blur(8px)',
          }}>✕</button>
        </div>

        {/* Section label */}
        <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 4, height: 16, background: accentColor, borderRadius: 2, display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>توزيع القوى البشرية</span>
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>اضغط على الفئة لعرض التخصصات</span>
        </div>

        {/* Workforce grid */}
        <div style={{ padding: '14px 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, overflowY: 'auto' }}>
          {deptWf.map(w => {
            const pct = deptTotal > 0 ? w.val / deptTotal : 0
            const r = 26, circ = 2 * Math.PI * r
            const dash = circ * pct
            const hasSpec = !!workforceSpecializations[w.label]
            return (
              <div key={w.label}
                onClick={() => hasSpec && setSpecModal({ label: w.label, total: w.val })}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 6, padding: '14px 8px', borderRadius: 12,
                  background: '#f8fafc', border: `1.5px solid ${w.color}18`,
                  cursor: hasSpec ? 'pointer' : 'default',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (hasSpec) { e.currentTarget.style.background = `${w.color}0e`; e.currentTarget.style.borderColor = `${w.color}45` } }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = `${w.color}18` }}
              >
                <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                  <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={32} cy={32} r={r} fill="none" stroke={`${w.color}1a`} strokeWidth={8} />
                    <circle cx={32} cy={32} r={r} fill="none" stroke={w.color} strokeWidth={8}
                      strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {w.icon}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: w.color, lineHeight: 1 }}>{w.val.toLocaleString('ar-EG')}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: w.color, borderRadius: 10, padding: '1px 7px' }}>
                  {(pct * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', lineHeight: 1.4, fontWeight: 600 }}>{w.label}</div>
                {hasSpec && <div style={{ fontSize: 8, color: w.color, opacity: 0.7, marginTop: -2 }}>اضغط للتفاصيل ▼</div>}
              </div>
            )
          })}
        </div>

        {/* Total footer */}
        <div style={{
          padding: '12px 24px',
          background: `${accentColor}08`, borderTop: `2px solid ${accentColor}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>∑ إجمالي القوى البشرية للإدارة</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: accentColor }}>{deptTotal.toLocaleString('ar-EG')} كادر</span>
        </div>
      </div>

      {specModal && (
        <WorkforceModal
          category={specModal.label}
          total={specModal.total}
          onClose={() => setSpecModal(null)}
        />
      )}
    </div>
  )
}
