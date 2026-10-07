import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import type { DiwanDept } from '../../domain/models'
import StatCard from '../../components/common/StatCard'
import SectionHeader from '../../components/common/SectionHeader'
import DiwanDeptModal from './DiwanDeptModal'

export default function DiwanPage() {
  const { diwanDepts: diwanDepartments, diwanWf: diwanWorkforce, directorateManager } = useAppData()
  const [deptModal, setDeptModal] = useState<DiwanDept | null>(null)
  const totalDiwanStaff = diwanWorkforce.reduce((s, w) => s + w.count, 0)
  const technicalDepts = diwanDepartments.filter(d => d.type === 'فنية')
  const adminDepts = diwanDepartments.filter(d => d.type === 'إدارية')
  const maxStaff = Math.max(...diwanDepartments.map(d => d.staff))

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
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚕️</div>
          <div>
            <div style={{ fontSize: 10, color: '#7dd3fc', fontWeight: 600, marginBottom: 3 }}>مدير مديرية الشؤون الصحية — كفرالشيخ</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{directorateManager}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 20px' }}>
          <div style={{ fontSize: 9, color: '#bae6fd', marginBottom: 3 }}>🏤 ديوان المديرية</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{diwanDepartments.length} إدارة</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-4">
        <StatCard large label="إجمالي الكوادر البشرية" value={totalDiwanStaff} unit="موظف" icon="👥" color="#0369a1" light="#e0f2fe" />
        <StatCard large label="رؤساء الأقسام والإدارات" value={diwanDepartments.length} unit="رئيس" icon="👔" color="#7c3aed" light="#ede9fe" />
        <StatCard large label="الإدارات الفنية" value={technicalDepts.length} unit="إدارة" icon="🔬" color="#0d9488" light="#ccfbf1" />
        <StatCard large label="الإدارات الإدارية" value={adminDepts.length} unit="إدارة" icon="📁" color="#d97706" light="#fef3c7" />
      </div>

      {/* Departments side by side */}
      <div className="grid-2col-eq">

        {/* Technical */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <SectionHeader title={`الإدارات الفنية (${technicalDepts.length})`} subtitle="اضغط على إدارة لعرض تفاصيل الكوادر" color="#064e3b" color2="#0d9488" />
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {technicalDepts.map((dept, i) => (
              <div key={i}
                onClick={() => setDeptModal(dept)}
                style={{
                  padding: '12px 18px', borderBottom: i < technicalDepts.length - 1 ? '1px solid #f0fdf4' : 'none',
                  display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f0fdf4')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{dept.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{dept.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{dept.head}</div>
                  <div style={{ height: 3, background: '#f0fdf4', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, background: '#0d9488', width: `${(dept.staff / maxStaff) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#ccfbf1', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 800, color: '#0d9488', flexShrink: 0 }}>{dept.staff}</div>
                  <span style={{ fontSize: 12, color: '#0d9488', opacity: 0.6 }}>←</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Administrative */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <SectionHeader title={`الإدارات الإدارية (${adminDepts.length})`} subtitle="اضغط على إدارة لعرض تفاصيل الكوادر" color="#78350f" color2="#d97706" />
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {adminDepts.map((dept, i) => (
              <div key={i}
                onClick={() => setDeptModal(dept)}
                style={{
                  padding: '12px 18px', borderBottom: i < adminDepts.length - 1 ? '1px solid #fffbeb' : 'none',
                  display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fffbeb')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{dept.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{dept.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{dept.head}</div>
                  <div style={{ height: 3, background: '#fffbeb', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, background: '#d97706', width: `${(dept.staff / maxStaff) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#fef3c7', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 800, color: '#d97706', flexShrink: 0 }}>{dept.staff}</div>
                  <span style={{ fontSize: 12, color: '#d97706', opacity: 0.6 }}>←</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {deptModal && (
        <DiwanDeptModal
          dept={deptModal}
          totalDiwanStaff={totalDiwanStaff}
          onClose={() => setDeptModal(null)}
        />
      )}
    </div>
  )
}
