import { useState } from 'react'
import type { AuthUser, Page } from '../../domain/models'
import DirectoratePage from '../directorate/DirectoratePage'
import DiwanPage from '../diwan/DiwanPage'
import AdministrationPage from '../administrations/AdministrationPage'
import HospitalPage from '../hospitals/HospitalPage'

const viewPages: { id: Page; label: string; icon: string; sub: string }[] = [
  { id: 'directorate',    label: 'مديرية الشؤون الصحية', icon: '🏛️', sub: 'نظرة عامة شاملة'      },
  { id: 'diwan',          label: 'ديوان المديرية',        icon: '🏤', sub: 'أقسام وكوادر الديوان'  },
  { id: 'administration', label: 'الإدارة الصحية',        icon: '🏢', sub: 'إدارة الوحدات'         },
  { id: 'hospital',       label: 'المستشفى',               icon: '🏥', sub: 'تفاصيل المستشفى'       },
]

export default function ViewDashboard({ user, onDataEntry, onLogout }: {
  user: AuthUser; onDataEntry: () => void; onLogout: () => void
}) {
  const [page, setPage] = useState<Page>('directorate')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const current = viewPages.find(p => p.id === page)!
  const closeSidebar = () => setSidebarOpen(false)
  const navTo = (id: Page) => { setPage(id); closeSidebar() }

  return (
    <div className="app-shell">
      <div className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`} onClick={closeSidebar} />
      <aside className={`app-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>⚕️</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>مديرية الشؤون الصحية</div>
              <div style={{ fontSize: 10, color: '#7dd3fc', marginTop: 2 }}>كفرالشيخ</div>
            </div>
            <button onClick={closeSidebar} style={{ marginRight: 'auto', background: 'none', border: 'none', color: '#7dd3fc', fontSize: 18, cursor: 'pointer', padding: 4 }}>✕</button>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
          <div style={{ fontSize: 10, color: '#4d9bc4', fontWeight: 700, marginBottom: 8, paddingRight: 8, letterSpacing: 1 }}>القطاعات</div>
          {viewPages.map(p => (
            <button key={p.id} onClick={() => navTo(p.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
              marginBottom: 4, fontFamily: 'Cairo, sans-serif', textAlign: 'right',
              background: page === p.id ? 'rgba(56,189,248,0.15)' : 'transparent',
              color: page === p.id ? '#38bdf8' : '#94c4d8',
              borderRight: page === p.id ? '3px solid #38bdf8' : '3px solid transparent',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{p.icon}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{p.label}</div>
                <div style={{ fontSize: 10, opacity: 0.65, marginTop: 1 }}>{p.sub}</div>
              </div>
            </button>
          ))}
        </nav>
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onDataEntry} style={{
            width: '100%', padding: '9px 12px', background: 'rgba(56,189,248,0.15)',
            border: '1px solid rgba(56,189,248,0.3)', borderRadius: 9,
            color: '#38bdf8', fontSize: 11, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'Cairo, sans-serif', marginBottom: 8,
          }}>✏️ لوحة إدخال البيانات</button>
          <div style={{ fontSize: 10, color: '#4d9bc4', textAlign: 'center' }}>وزارة الصحة · نظام المتابعة اللاحظي</div>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
            <span style={{ fontSize: 20 }}>{current.icon}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>{current.label}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{current.sub}</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-search">
              <span style={{ fontSize: 13, color: '#94a3b8' }}>🔍</span>
              <input placeholder="بحث..." />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={onDataEntry} style={{ padding: '6px 14px', background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: 8, color: '#0369a1', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                ✏️ إدخال البيانات
              </button>
              <div className="topbar-user">
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{user.username[0].toUpperCase()}</div>
                <div className="user-name">
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>{user.displayName}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', cursor: 'pointer' }} onClick={onLogout}>تسجيل الخروج</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '7px 18px', display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
          {['الرئيسية', current.label].map((b, i, arr) => (
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 11, color: i === arr.length - 1 ? '#0369a1' : '#94a3b8', fontWeight: i === arr.length - 1 ? 600 : 400 }}>{b}</span>
              {i < arr.length - 1 && <span style={{ fontSize: 11, color: '#cbd5e1' }}>{'<'}</span>}
            </span>
          ))}
        </div>

        <div className="app-content">
          {page === 'directorate'    && <DirectoratePage />}
          {page === 'diwan'          && <DiwanPage />}
          {page === 'administration' && <AdministrationPage />}
          {page === 'hospital'       && <HospitalPage />}
        </div>
      </div>
    </div>
  )
}
