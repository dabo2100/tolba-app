import { useState } from 'react'
import type { AuthUser } from './domain/models'
import { useAppData } from './state/AppDataContext'
import { buildDemoUsers } from './features/auth/demoUsers'
import LoginPage from './features/auth/LoginPage'
import DataEntryDashboard from './features/dashboard/DataEntryDashboard'
import DiwanOnlyShell from './features/dashboard/DiwanOnlyShell'
import ViewDashboard from './features/dashboard/ViewDashboard'

export default function App() {
  const { hosps, admins } = useAppData()
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [mode, setMode] = useState<'view' | 'entry'>('view')
  const logout = () => { setCurrentUser(null); setMode('view') }

  if (!currentUser) {
    return <LoginPage
      onLogin={user => { setCurrentUser(user); setMode(user.role.type === 'superadmin' ? 'view' : 'entry') }}
      allUsers={buildDemoUsers(hosps, admins)}
    />
  }

  if (currentUser.role.type === 'diwan') {
    return <DiwanOnlyShell user={currentUser} onLogout={logout} />
  }

  if (currentUser.role.type === 'superadmin' && mode === 'view') {
    return <ViewDashboard user={currentUser} onDataEntry={() => setMode('entry')} onLogout={logout} />
  }

  return <DataEntryDashboard user={currentUser} onViewDashboard={() => setMode('view')} onLogout={logout} />
}
