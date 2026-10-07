import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import { typeColors } from '../../data/reference'
import StatCard from '../../components/common/StatCard'
import WorkforceModal from '../workforce/WorkforceModal'

export default function HospitalPage({ initialIdx }: { initialIdx?: number } = {}) {
  const { hosps: hospitals, wf: workforce, directorateUnits, workforceSpecializations } = useAppData()
  const totalHospBeds = hospitals.reduce((s, h) => s + h.beds, 0)
  const totalWfHospital = workforce.reduce((s, w) => s + w.hospital, 0) || 1
  const [selectedIdx, setSelectedIdx] = useState(initialIdx ?? 0)
  const [activeTab, setActiveTab] = useState<'units' | 'occupancy'>('units')
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  const hospital = hospitals[selectedIdx] ?? hospitals[0]

  // Scale unit capacities proportionally to this hospital's bed count
  const bedsScale = hospital.beds / (totalHospBeds || 1)
  const hospUnits = directorateUnits.map((u, i) => ({
    ...u,
    value: Math.max(1, Math.round(u.dirTotal * bedsScale)),
    occ: Math.min(97, Math.max(35, u.occBase + ((selectedIdx * 7 + i * 11) % 17) - 8)),
  }))

  // Scale workforce to match this hospital's actual staff count
  const wfScale = hospital.staff / totalWfHospital
  const hospWorkforce = workforce.map(w => ({
    ...w,
    scaled: Math.max(1, Math.round(w.hospital * wfScale)),
  }))
  const hospWfMax = Math.max(...hospWorkforce.map(w => w.scaled))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hospital Selector */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 10 }}>اختر المستشفى</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {hospitals.map((h, i) => {
            const tc = typeColors[h.type]
            return (
              <button key={h.name} onClick={() => setSelectedIdx(i)} style={{
                padding: '6px 12px', borderRadius: 8,
                border: `1.5px solid ${selectedIdx === i ? tc.text : '#e2e8f0'}`,
                background: selectedIdx === i ? tc.bg : '#f8fafc',
                color: selectedIdx === i ? tc.text : '#475569',
                fontSize: 11, fontWeight: selectedIdx === i ? 700 : 500,
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
              }}>
                {h.name.replace(/^مستشفى\s*/, '')}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hospital Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0284c7)',
        borderRadius: 14, padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🏥</div>
          <div>
            <div style={{ fontSize: 11, color: '#bae6fd', marginBottom: 3 }}>المستشفى المحدد</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: '#fff' }}>{hospital.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
              <span style={{
                padding: '2px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.15)', color: '#e0f2fe', fontSize: 11, fontWeight: 600,
              }}>مستشفى {hospital.type}</span>
              <span style={{ fontSize: 11, color: '#bae6fd' }}>·</span>
              <span style={{ fontSize: 11, color: '#bae6fd', fontWeight: 600 }}>مدير: <span style={{ color: '#fff' }}>{hospital.manager}</span></span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'القوى البشرية', val: hospital.staff, icon: '👥' },
            { label: 'الأسرة', val: hospital.beds, icon: '🛏️' },
            { label: 'الأقسام', val: 8, icon: '🏥' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 20px' }}>
              <div style={{ fontSize: 10, color: '#bae6fd', marginBottom: 4 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{s.val.toLocaleString('ar-EG')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid-4">
        {hospUnits.map(u => (
          <StatCard key={u.label} label={u.label} value={u.value} unit={u.unit} icon={u.icon} color={u.color} light={u.light} />
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {[{ id: 'units' as const, label: '👥 القوى البشرية' }, { id: 'occupancy' as const, label: '📊 نسب الإشغال' }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '13px 24px', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700,
              background: activeTab === t.id ? '#fff' : 'transparent',
              color: activeTab === t.id ? '#0369a1' : '#64748b',
              borderBottom: activeTab === t.id ? '2px solid #0369a1' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>
        {activeTab === 'units' && (
          <div className="grid-wf" style={{ padding: 20 }}>
            {hospWorkforce.map(w => {
              const hasSpec = !!workforceSpecializations[w.label]
              return (
                <div key={w.label}
                  onClick={() => hasSpec && setModal({ label: w.label, total: w.scaled })}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', background: '#f8fafc', borderRadius: 10, border: '1px solid #f1f5f9',
                    cursor: hasSpec ? 'pointer' : 'default', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (hasSpec) e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc' }}
                >
                  <span style={{ fontSize: 20 }}>{w.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', marginBottom: 5 }}>{w.label}</div>
                    <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: w.color, width: `${(w.scaled / hospWfMax) * 100}%` }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 800, color: w.color, minWidth: 36, textAlign: 'center' }}>{w.scaled}</span>
                  {hasSpec && <span style={{ fontSize: 10, color: w.color, opacity: 0.6 }}>▼</span>}
                </div>
              )
            })}
          </div>
        )}
        {activeTab === 'occupancy' && (
          <div className="grid-4" style={{ padding: 20 }}>
            {hospUnits.map(u => {
              const pct = u.occ
              const color = pct > 85 ? '#dc2626' : pct > 65 ? '#d97706' : '#16a34a'
              return (
                <div key={u.label} style={{ padding: '16px', background: '#f8fafc', borderRadius: 12, textAlign: 'center', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{u.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{u.label}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{u.value.toLocaleString('ar-EG')}</span> {u.unit}
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)`, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color }}>{pct}%</div>
                  </div>
                  <div style={{ fontSize: 10, color: color, fontWeight: 700 }}>
                    {pct > 85 ? 'إشغال عالٍ' : pct > 65 ? 'إشغال متوسط' : 'إشغال منخفض'}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
    </div>
  )
}
