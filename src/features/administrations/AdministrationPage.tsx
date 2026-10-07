import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import StatCard from '../../components/common/StatCard'
import { WorkforceSection } from '../workforce/WorkforceOverview'
import WorkforceModal from '../workforce/WorkforceModal'
import UnitWorkforceModal from './UnitWorkforceModal'

export default function AdministrationPage({ initialIdx }: { initialIdx?: number } = {}) {
  const { admins: administrations } = useAppData()
  const [selected, setSelected] = useState(initialIdx ?? 0)
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<{ name: string; type: string; staff: number; active: boolean } | null>(null)
  const [activeTab, setActiveTab] = useState<'workforce' | 'units'>('workforce')
  const admin = administrations[selected] ?? administrations[0]
  const subUnits = Array.from({ length: admin.units }, (_, i) => ({
    name: `مركز صحي ${['الحي الأول', 'الحي الثاني', 'الضاحية', 'الروضة', 'النزهة', 'المنطقة الصناعية', 'الأمل', 'الريف', 'الجديدة', 'الشرقية', 'الغربية', 'الشمالية', 'الجنوبية', 'المركزي', 'الوادي', 'الساحل', 'الهضبة', 'السهل'][i] || `رقم ${i + 1}`}`,
    type: i % 3 === 0 ? 'وحدة صحية' : i % 3 === 1 ? 'مركز صحي' : 'عيادة',
    staff: Math.floor(admin.staff / admin.units * (0.8 + Math.random() * 0.4)),
    active: i !== 4,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Admin Selector */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 10 }}>اختر الإدارة الصحية</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {administrations.map((a, i) => (
            <button key={a.name} onClick={() => setSelected(i)} style={{
              padding: '7px 14px', borderRadius: 8, border: '1.5px solid',
              borderColor: selected === i ? '#7c3aed' : '#e2e8f0',
              background: selected === i ? '#ede9fe' : '#f8fafc',
              color: selected === i ? '#7c3aed' : '#475569',
              fontSize: 12, fontWeight: selected === i ? 700 : 500,
              cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
            }}>إدارة {a.name}</button>
          ))}
        </div>
      </div>

      {/* Admin Manager Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
        borderRadius: 12, padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏢</div>
        <div>
          <div style={{ fontSize: 10, color: '#ddd6fe', fontWeight: 600, marginBottom: 2 }}>مدير إدارة {admin.name} الصحية</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>{admin.manager}</div>
        </div>
      </div>

      {/* KPIs Row 1 */}
      {(() => {
        const devUnits = Math.round(admin.units * 0.3)
        const accUnits = Math.round(admin.units * 0.25)
        const totalUnits = admin.units + devUnits + accUnits
        return (
          <>
            <div className="grid-5" style={{ marginBottom: 12 }}>
              <StatCard large label={`إجمالي الكوادر – إدارة ${admin.name}`} value={admin.staff} unit="موظف" icon="👥" color="#7c3aed" light="#ede9fe" />
              <StatCard large label="إجمالي الوحدات" value={totalUnits} unit="وحدة" icon="📊" color="#0c4a6e" light="#e0f2fe" />
              <StatCard large label="الوحدات الصحية" value={admin.units} unit="وحدة" icon="🏥" color="#0369a1" light="#dbeafe" />
              <StatCard large label="وحدات التطوير" value={devUnits} unit="وحدة" icon="📈" color="#0d9488" light="#ccfbf1" />
              <StatCard large label="وحدات الاعتماد" value={accUnits} unit="وحدة" icon="🏅" color="#d97706" light="#fef3c7" />
            </div>
            {/* KPIs Row 2 */}
            <div className="grid-4">
              <StatCard label="مكاتب الصحة" value={Math.round(admin.units * 0.6)} unit="مكتب" icon="🏢" color="#16a34a" light="#dcfce7" />
              <StatCard label="مكاتب التطعيمات" value={Math.round(admin.units * 0.55)} unit="مكتب" icon="💉" color="#dc2626" light="#fee2e2" />
              <StatCard label="عيادات الأسنان" value={Math.round(admin.units * 0.4)} unit="عيادة" icon="🦷" color="#6d28d9" light="#f5f3ff" />
              <StatCard label="عيادات العلاج الطبيعي" value={Math.round(admin.units * 0.35)} unit="عيادة" icon="🏃" color="#ea580c" light="#ffedd5" />
            </div>
          </>
        )
      })()}

      {/* Tabbed section: Workforce / Units */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {[
            { id: 'workforce' as const, label: '👥 القوى البشرية' },
            { id: 'units' as const, label: '🏥 الوحدات الصحية' },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '13px 22px', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700,
              background: activeTab === t.id ? '#fff' : 'transparent',
              color: activeTab === t.id ? '#7c3aed' : '#64748b',
              borderBottom: activeTab === t.id ? '2px solid #7c3aed' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>

        {activeTab === 'workforce' && (
          <div style={{ padding: 20 }}>
            <WorkforceSection field="administration" onSelect={(l, t) => setModal({ label: l, total: t })} />
          </div>
        )}

        {activeTab === 'units' && (
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {subUnits.map((u, i) => (
              <div key={i} style={{
                padding: '11px 18px',
                borderBottom: i < subUnits.length - 1 ? '1px solid #f8fafc' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background 0.15s', cursor: 'pointer',
              }}
                onClick={() => setSelectedUnit(u)}
                onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: u.active ? '#16a34a' : '#f59e0b', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{u.name}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{u.type} · {u.active ? 'نشط' : 'تحت الصيانة'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#f5f3ff', borderRadius: 7, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: '#7c3aed' }}>
                    {u.staff} موظف
                  </div>
                  <span style={{ fontSize: 11, color: '#7c3aed', opacity: 0.6 }}>▶</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
      {selectedUnit && <UnitWorkforceModal unit={selectedUnit} adminStaff={admin.staff} onClose={() => setSelectedUnit(null)} />}
    </div>
  )
}
