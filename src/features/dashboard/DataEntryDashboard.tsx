import type { AuthUser } from '../../domain/models'
import { useAppData } from '../../state/AppDataContext'
import SuperAdminPanel from './SuperAdminPanel'
import DiwanDataEntry from '../diwan/DiwanDataEntry'
import AdminDataEntry from '../administrations/AdminDataEntry'
import HospitalDataEntry from '../hospitals/HospitalDataEntry'

export default function DataEntryDashboard({ user, onViewDashboard, onLogout }: {
  user: AuthUser
  onViewDashboard: () => void
  onLogout: () => void
}) {
  const role = user.role
  const { hosps, admins } = useAppData()
  const hospIdx = role.type === 'hospital' ? hosps.findIndex(h => h.id === role.entityId) : -1
  const adminIdx = role.type === 'administration' ? admins.findIndex(a => a.id === role.entityId) : -1
  const isSuper = role.type === 'superadmin'
  const isDiwan = role.type === 'diwan'

  if ((role.type === 'hospital' && hospIdx < 0) || (role.type === 'administration' && adminIdx < 0)) {
    return <div role="alert" style={{ padding: 32 }}>الجهة المطلوبة غير موجودة. <button onClick={onLogout}>تسجيل الخروج</button></div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Cairo, sans-serif' }}>
      {/* Top bar */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px',
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚕️</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>نظام إدارة البيانات</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>مديرية الشؤون الصحية · كفرالشيخ</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{user.displayName}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{user.username}</div>
          </div>
          {(isSuper || isDiwan) && (
            <button onClick={onViewDashboard} style={{ padding: '6px 14px', background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: 8, color: '#0369a1', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
              📊 الداشبورد
            </button>
          )}
          <button onClick={onLogout} style={{ padding: '6px 14px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
            خروج
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>
        {isSuper && <SuperAdminPanel onViewDashboard={onViewDashboard} />}
        {isDiwan && <DiwanDataEntry />}
        {role.type === 'administration' && <AdminDataEntry adminIdx={adminIdx} />}
        {role.type === 'hospital' && <HospitalDataEntry hospIdx={hospIdx} />}
      </div>
    </div>
  )
}
