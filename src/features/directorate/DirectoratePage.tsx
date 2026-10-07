import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import { typeColors } from '../../data/reference'
import StatCard from '../../components/common/StatCard'
import SectionHeader from '../../components/common/SectionHeader'
import { WorkforceChart, WorkforceSection } from '../workforce/WorkforceOverview'
import WorkforceModal from '../workforce/WorkforceModal'

export default function DirectoratePage() {
  const { hosps: hospitals, admins: administrations, directorateManager } = useAppData()
  const totalHospitalStaff = hospitals.reduce((s, h) => s + h.staff, 0)
  const totalAdminStaff = administrations.reduce((s, a) => s + a.staff, 0)
  const totalDirectorateStaff = totalHospitalStaff + totalAdminStaff
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Director Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)',
        borderRadius: 14, padding: '16px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(3,105,161,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, backdropFilter: 'blur(8px)' }}>⚕️</div>
          <div>
            <div style={{ fontSize: 10, color: '#7dd3fc', fontWeight: 600, marginBottom: 3, letterSpacing: 0.5 }}>مدير مديرية الشؤون الصحية — كفرالشيخ</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{directorateManager}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { val: hospitals.length, label: 'مستشفى', icon: '🏥' },
            { val: administrations.length, label: 'إدارة صحية', icon: '🏢' },
            { val: totalDirectorateStaff.toLocaleString('ar-EG'), label: 'كادر وظيفي', icon: '👥' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 9, color: '#bae6fd', marginBottom: 3 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 1 – KPI Cards Row 1 */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0369a1', borderRadius: 2, display: 'inline-block' }} />
          المؤشرات الرئيسية للمديرية
        </div>
        {/* Row 1: 3 main */}
        <div className="grid-3" style={{ marginBottom: 12 }}>
          <StatCard large label="إجمالي الكوادر البشرية" value={totalDirectorateStaff} unit="موظف" icon="👥" color="#0369a1" light="#e0f2fe" />
          <StatCard large label="الإدارات الصحية" value={administrations.length} unit="إدارة" icon="🏢" color="#7c3aed" light="#ede9fe" />
          <StatCard large label="المستشفيات" value={hospitals.length} unit="مستشفى" icon="🏥" color="#0d9488" light="#ccfbf1" />
        </div>
        {/* Row 2: 7 medical capacity indicators */}
        <div className="grid-7">
          <StatCard label="الأسرة الداخلية"        value={1840} unit="سرير"  icon="🛏️" color="#d97706" light="#fef3c7" />
          <StatCard label="غرف العمليات"            value={87}   unit="غرفة"  icon="🏥" color="#0369a1" light="#e0f2fe" />
          <StatCard label="أسرة العناية المركزة"   value={312}  unit="سرير"  icon="❤️‍🔥" color="#dc2626" light="#fee2e2" />
          <StatCard label="أسرة الاستقبال"         value={524}  unit="سرير"  icon="🚪" color="#16a34a" light="#dcfce7" />
          <StatCard label="ماكينات الغسيل الكلوي" value={143}  unit="ماكينة" icon="🫀" color="#0d9488" light="#ccfbf1" />
          <StatCard label="أجهزة التنفس"           value={218}  unit="جهاز"  icon="🫁" color="#ea580c" light="#ffedd5" />
          <StatCard label="حضانات الأطفال"         value={96}   unit="حضانة" icon="🍼" color="#ec4899" light="#fce7f3" />
        </div>
      </div>

      {/* Section 2 – Workforce + Chart */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} />
          توزيع القوى البشرية
        </div>
        <div className="grid-2col-eq">
          <WorkforceSection field="directorate" onSelect={(l, t) => setModal({ label: l, total: t })} />

          {/* Chart */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            <SectionHeader
              title="مخطط القوى البشرية"
              subtitle="مقارنة الكوادر عبر التخصصات"
              color="#6d28d9"
              color2="#7c3aed"
            />
            <WorkforceChart field="directorate" onSelect={(l, t) => setModal({ label: l, total: t })} />
          </div>
        </div>
      </div>

      {/* Section 3 – Hospitals + Administrations */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0d9488', borderRadius: 2, display: 'inline-block' }} />
          المستشفيات والإدارات الصحية التابعة
        </div>
        <div className="grid-2col-eq">

          {/* Hospitals */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            <SectionHeader
              title={`المستشفيات التابعة للمديرية (${hospitals.length})`}
              subtitle={`إجمالي القوى البشرية: ${totalHospitalStaff.toLocaleString('ar-EG')} موظف`}
              color="#0c4a6e"
              color2="#0369a1"
            />
            {/* Type summary */}
            <div className="grid-hosp-type" style={{ borderBottom: '1px solid #f1f5f9' }}>
              {[
                { type: 'عام', count: 2 },
                { type: 'نموذجي', count: 2 },
                { type: 'مركزي', count: 6 },
                { type: 'نوعي', count: 8 },
              ].map((t, i) => {
                const tc = typeColors[t.type]
                return (
                  <div key={t.type} style={{
                    padding: '10px 14px', textAlign: 'center',
                    borderLeft: i < 3 ? '1px solid #f1f5f9' : 'none',
                    background: tc.bg,
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: tc.text }}>{t.count}</div>
                    <div style={{ fontSize: 10, color: tc.text, fontWeight: 600, marginTop: 1 }}>{t.type}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ maxHeight: 380, overflowY: 'auto' }}>
              {hospitals.map((h, i) => {
                const tc = typeColors[h.type]
                return (
                  <div key={h.name} style={{
                    padding: '11px 18px',
                    borderBottom: i < hospitals.length - 1 ? '1px solid #f8fafc' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>🏥</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{h.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>مدير: {h.manager}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#0369a1' }}>{h.staff.toLocaleString('ar-EG')}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>كادر</div>
                      </div>
                      <span style={{
                        padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                        background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
                      }}>{h.type}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Administrations */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            <SectionHeader
              title={`الإدارات الصحية (${administrations.length})`}
              subtitle={`إجمالي القوى البشرية: ${totalAdminStaff.toLocaleString('ar-EG')} موظف`}
              color="#5b21b6"
              color2="#7c3aed"
            />
            {/* Total banner */}
            <div style={{ padding: '10px 18px', background: '#faf5ff', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 24 }}>
              <div style={{ fontSize: 11, color: '#6d28d9' }}>
                <span style={{ fontWeight: 800 }}>{administrations.reduce((s, a) => s + a.units, 0)}</span> وحدة صحية إجمالاً
              </div>
              <div style={{ fontSize: 11, color: '#6d28d9' }}>
                <span style={{ fontWeight: 800 }}>{totalAdminStaff.toLocaleString('ar-EG')}</span> موظف إجمالاً
              </div>
            </div>
            <div style={{ maxHeight: 430, overflowY: 'auto' }}>
              {administrations.map((a, i) => {
                const maxStaff = Math.max(...administrations.map(x => x.staff))
                const pct = (a.staff / maxStaff) * 100
                return (
                  <div key={a.name} style={{
                    padding: '13px 18px',
                    borderBottom: i < administrations.length - 1 ? '1px solid #f8fafc' : 'none',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 7,
                          background: '#ede9fe', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: 13,
                        }}>🏢</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>إدارة {a.name} الصحية</div>
                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>مدير: {a.manager}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{a.staff.toLocaleString('ar-EG')}</div>
                          <div style={{ fontSize: 9, color: '#94a3b8' }}>موظف</div>
                        </div>
                        <div style={{
                          background: '#e0f2fe', borderRadius: 6, padding: '3px 8px',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#0369a1' }}>{a.units}</div>
                          <div style={{ fontSize: 9, color: '#0369a1' }}>وحدة</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                        width: `${pct}%`, transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
    </div>
  )
}
