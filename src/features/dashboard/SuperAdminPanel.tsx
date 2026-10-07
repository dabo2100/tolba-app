import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import { typeColors } from '../../data/reference'
import StatCard from '../../components/common/StatCard'
import HospitalDataEntry from '../hospitals/HospitalDataEntry'
import AdminDataEntry from '../administrations/AdminDataEntry'
import DiwanDataEntry from '../diwan/DiwanDataEntry'

export default function SuperAdminPanel({ onViewDashboard }: { onViewDashboard: () => void }) {
  const { hosps, admins, diwanWf, changeLog } = useAppData()
  const [activeSection, setActiveSection] = useState<'overview' | 'hospitals' | 'admins' | 'diwan' | 'log'>('overview')
  const [editHospIdx, setEditHospIdx] = useState<number | null>(null)
  const [editAdminIdx, setEditAdminIdx] = useState<number | null>(null)

  const totalStaff = hosps.reduce((s, h) => s + h.staff, 0) + admins.reduce((s, a) => s + a.staff, 0)
  const totalBeds = hosps.reduce((s, h) => s + h.beds, 0)
  const totalUnits = admins.reduce((s, a) => s + a.units, 0)
  const diwanTotal = diwanWf.reduce((s, w) => s + w.count, 0)

  const sections = [
    { id: 'overview' as const, label: 'نظرة عامة', icon: '📊' },
    { id: 'hospitals' as const, label: `المستشفيات (${hosps.length})`, icon: '🏥' },
    { id: 'admins' as const, label: `الإدارات (${admins.length})`, icon: '🏢' },
    { id: 'diwan' as const, label: 'الديوان', icon: '🏤' },
    { id: 'log' as const, label: 'سجل التغييرات', icon: '📋' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0369a1, #0ea5e9)',
        borderRadius: 14, padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(3,105,161,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>⚕️</div>
          <div>
            <div style={{ fontSize: 11, color: '#7dd3fc', fontWeight: 600 }}>لوحة التحكم الرئيسية — صلاحيات كاملة</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: '#fff' }}>مديرية الشؤون الصحية — كفرالشيخ</div>
          </div>
        </div>
        <button onClick={onViewDashboard} style={{
          padding: '9px 20px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
        }}>📊 عرض الداشبورد الكامل</button>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => { setActiveSection(s.id); setEditHospIdx(null); setEditAdminIdx(null) }} style={{
            padding: '9px 18px', borderRadius: 10, border: '1.5px solid',
            borderColor: activeSection === s.id ? '#0369a1' : '#e2e8f0',
            background: activeSection === s.id ? '#e0f2fe' : '#f8fafc',
            color: activeSection === s.id ? '#0369a1' : '#475569',
            fontSize: 12, fontWeight: activeSection === s.id ? 700 : 500,
            cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
          }}>{s.icon} {s.label}</button>
        ))}
      </div>

      {/* Overview */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="grid-4">
            <StatCard large label="إجمالي الكوادر البشرية" value={totalStaff} unit="موظف" icon="👥" color="#0369a1" light="#e0f2fe" />
            <StatCard large label="المستشفيات" value={hosps.length} unit="مستشفى" icon="🏥" color="#0d9488" light="#ccfbf1" />
            <StatCard large label="الإدارات الصحية" value={admins.length} unit="إدارة" icon="🏢" color="#7c3aed" light="#ede9fe" />
            <StatCard large label="الأسرة الداخلية" value={totalBeds} unit="سرير" icon="🛏️" color="#d97706" light="#fef3c7" />
          </div>
          <div className="grid-3">
            <StatCard label="كوادر الديوان" value={diwanTotal} unit="موظف" icon="🏤" color="#dc2626" light="#fee2e2" />
            <StatCard label="الوحدات الصحية" value={totalUnits} unit="وحدة" icon="📍" color="#ea580c" light="#ffedd5" />
            <StatCard label="إجمالي الإدارات" value={admins.reduce((s, a) => s + a.staff, 0)} unit="موظف" icon="🏢" color="#6d28d9" light="#f5f3ff" />
          </div>
          {/* Quick access grid */}
          <div className="grid-2col-eq">
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', color: '#fff', fontSize: 13, fontWeight: 700 }}>🏥 المستشفيات — آخر الأرقام</div>
              <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                {hosps.map((h, i) => (
                  <div key={i} style={{ padding: '10px 18px', borderBottom: i < hosps.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                    onClick={() => { setActiveSection('hospitals'); setEditHospIdx(i) }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f9ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{h.name}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>مدير: {h.manager}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0369a1' }}>{h.staff.toLocaleString('ar-EG')}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8' }}>كادر · {h.beds} سرير</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: 'linear-gradient(135deg,#5b21b6,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 700 }}>🏢 الإدارات الصحية — آخر الأرقام</div>
              <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                {admins.map((a, i) => (
                  <div key={i} style={{ padding: '10px 18px', borderBottom: i < admins.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                    onClick={() => { setActiveSection('admins'); setEditAdminIdx(i) }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>إدارة {a.name}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{a.manager}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{a.staff.toLocaleString('ar-EG')}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8' }}>{a.units} وحدة</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hospitals Edit List */}
      {activeSection === 'hospitals' && (
        <div>
          {editHospIdx !== null ? (
            <div>
              <button onClick={() => setEditHospIdx(null)} style={{ marginBottom: 14, padding: '7px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', color: '#475569' }}>← رجوع للقائمة</button>
              <HospitalDataEntry hospIdx={editHospIdx} />
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', color: '#fff', fontSize: 14, fontWeight: 700 }}>🏥 المستشفيات ({hosps.length}) — اضغط لتعديل</div>
              {hosps.map((h, i) => {
                const tc = typeColors[h.type]
                return (
                  <div key={i} onClick={() => setEditHospIdx(i)} style={{ padding: '13px 20px', borderBottom: i < hosps.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f9ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>🏥</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{h.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{h.manager}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0369a1' }}>{h.staff.toLocaleString('ar-EG')}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>كادر</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0d9488' }}>{h.beds}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>سرير</div>
                      </div>
                      <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>{h.type}</span>
                      <span style={{ fontSize: 11, color: '#0369a1' }}>✏️</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Admins Edit List */}
      {activeSection === 'admins' && (
        <div>
          {editAdminIdx !== null ? (
            <div>
              <button onClick={() => setEditAdminIdx(null)} style={{ marginBottom: 14, padding: '7px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', color: '#475569' }}>← رجوع للقائمة</button>
              <AdminDataEntry adminIdx={editAdminIdx} isSuperAdmin />
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#5b21b6,#7c3aed)', color: '#fff', fontSize: 14, fontWeight: 700 }}>🏢 الإدارات الصحية ({admins.length}) — اضغط لتعديل</div>
              {admins.map((a, i) => (
                <div key={i} onClick={() => setEditAdminIdx(i)} style={{ padding: '13px 20px', borderBottom: i < admins.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>🏢</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>إدارة {a.name} الصحية</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{a.manager}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{a.staff.toLocaleString('ar-EG')}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8' }}>موظف</div>
                    </div>
                    <div style={{ background: '#e0f2fe', borderRadius: 6, padding: '3px 9px', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0369a1' }}>{a.units}</div>
                      <div style={{ fontSize: 9, color: '#0369a1' }}>وحدة</div>
                    </div>
                    <span style={{ fontSize: 11, color: '#7c3aed' }}>✏️</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Diwan */}
      {activeSection === 'diwan' && <DiwanDataEntry />}

      {/* Change Log */}
      {activeSection === 'log' && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#1e293b,#334155)', color: '#fff', fontSize: 14, fontWeight: 700 }}>📋 سجل التغييرات ({changeLog.length})</div>
          {changeLog.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>لا توجد تغييرات مسجلة بعد</div>
          ) : (
            <div style={{ maxHeight: 460, overflowY: 'auto' }}>
              {[...changeLog].reverse().map((l, i) => (
                <div key={i} style={{ padding: '11px 20px', borderBottom: i < changeLog.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0369a1', flexShrink: 0, marginTop: 5 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{l.msg}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                      {l.actor} · {new Date(l.ts).toLocaleString('ar-EG')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
