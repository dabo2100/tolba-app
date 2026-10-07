import { useState } from 'react'
import type { AuthUser } from '../../domain/models'
import DiwanPage from '../diwan/DiwanPage'
import DiwanDataEntry from '../diwan/DiwanDataEntry'

export default function DiwanOnlyShell({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [editMode, setEditMode] = useState(false)
  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Cairo, sans-serif' }}>
      <header style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px',
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0f766e,#0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏤</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>ديوان المديرية</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>مديرية الشؤون الصحية · كفرالشيخ</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setEditMode(false)} style={{
            padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
            borderColor: !editMode ? '#0d9488' : '#e2e8f0',
            background: !editMode ? '#ccfbf1' : '#f8fafc',
            color: !editMode ? '#0d9488' : '#475569',
            fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
          }}>📊 عرض البيانات</button>
          <button onClick={() => setEditMode(true)} style={{
            padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
            borderColor: editMode ? '#0d9488' : '#e2e8f0',
            background: editMode ? '#ccfbf1' : '#f8fafc',
            color: editMode ? '#0d9488' : '#475569',
            fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
          }}>✏️ تعديل البيانات</button>
          <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>{user.displayName}</div>
          <button onClick={onLogout} style={{ padding: '6px 14px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>خروج</button>
        </div>
      </header>
      <div style={{ maxWidth: editMode ? 1100 : 1300, margin: '0 auto', padding: '24px 20px' }}>
        {editMode ? <DiwanDataEntry /> : <DiwanPage />}
      </div>
    </div>
  )
}
