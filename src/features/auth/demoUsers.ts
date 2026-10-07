import type { Administration, AuthUser, Hospital } from '../../domain/models'

// Demo-only accounts. Replace with server-side authentication before production.
export function buildDemoUsers(hosps: Hospital[], admins: Administration[]): AuthUser[] {
  return [
    { username: 'admin', password: '1234', role: { type: 'superadmin' }, displayName: 'م / محمد طلبة' },
    { username: 'diwan', password: '1234', role: { type: 'diwan' }, displayName: 'ديوان المديرية' },
    ...admins.map((a, i): AuthUser => ({
      username: `a${i + 1}`, password: '1234',
      role: { type: 'administration', entityId: a.id },
      displayName: `إدارة ${a.name} الصحية`,
    })),
    ...hosps.map((h, i): AuthUser => ({
      username: `h${i + 1}`, password: '1234',
      role: { type: 'hospital', entityId: h.id },
      displayName: h.name,
    })),
  ]
}
