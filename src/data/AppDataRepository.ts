import type {
  Administration, AppDataSnapshot, ChangeLogEntry, DiwanDept,
  DiwanWfItem, Hospital,
} from '../domain/models'

export type NewDiwanDept = Omit<DiwanDept, 'id'>
export type DiwanData = { departments: DiwanDept[]; workforce: DiwanWfItem[] }

// The UI only depends on this contract. A future HTTP adapter can implement it
// without giving the browser direct access to PostgreSQL or database credentials.
export interface AppDataRepository {
  load(): Promise<AppDataSnapshot>
  updateHospital(id: string, patch: Partial<Omit<Hospital, 'id'>>): Promise<Hospital>
  updateAdministration(id: string, patch: Partial<Omit<Administration, 'id'>>): Promise<Administration>
  saveDiwanData(input: DiwanData): Promise<DiwanData>
  createDiwanDept(input: NewDiwanDept): Promise<DiwanDept>
  deleteDiwanDept(id: string): Promise<void>
  appendChange(entry: ChangeLogEntry): Promise<ChangeLogEntry>
}
