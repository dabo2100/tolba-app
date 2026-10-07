// Data contracts are independent of React, the demo seed, and the storage adapter.
// IDs stay stable if lists are re-ordered or later loaded from an API.
export type Hospital = {
  id: string
  name: string
  type: string
  staff: number
  beds: number
  manager: string
}

export type Administration = {
  id: string
  name: string
  staff: number
  units: number
  manager: string
}

export type DiwanDept = {
  id: string
  name: string
  icon: string
  staff: number
  head: string
  type: string
}

export type DiwanWfItem = {
  id: string
  label: string
  icon: string
  count: number
  color: string
}

export type WfItem = {
  label: string
  icon: string
  directorate: number
  administration: number
  hospital: number
  color: string
}

export type ChangeLogEntry = { ts: number; actor: string; msg: string }

export type DirectorateUnit = {
  label: string
  icon: string
  dirTotal: number
  unit: string
  color: string
  light: string
  occBase: number
}

export type AppDataSnapshot = {
  hosps: Hospital[]
  admins: Administration[]
  diwanDepts: DiwanDept[]
  diwanWf: DiwanWfItem[]
  wf: WfItem[]
  workforceSpecializations: Record<string, SpecData>
  directorateUnits: DirectorateUnit[]
  directorateManager: string
  changeLog: ChangeLogEntry[]
}

export type Page = 'directorate' | 'diwan' | 'administration' | 'hospital'
export type Role =
  | { type: 'superadmin' }
  | { type: 'diwan' }
  | { type: 'administration'; entityId: string }
  | { type: 'hospital'; entityId: string }

// Demo credentials only. Production authentication must live on the server.
export type AuthUser = { username: string; password: string; role: Role; displayName: string }

export type SpecRow = { name: string; g1: number; g2: number; g3: number; g4?: number }
export type SimpleSpec = { name: string; count: number }
export type SpecData = {
  gradeLabels: string[]
  icon: string
  color: string
  specs?: SpecRow[]
  simpleGrades?: number[]
  simpleSpecs?: SimpleSpec[]
}
