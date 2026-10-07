import type {
  Administration, AppDataSnapshot, ChangeLogEntry, DiwanDept,
  Hospital,
} from '../domain/models'
import { createSeedSnapshot } from './seed'
import type { AppDataRepository, DiwanData, NewDiwanDept } from './AppDataRepository'

// Demo adapter: changes last only until the page is reloaded.
export class MemoryAppDataRepository implements AppDataRepository {
  private data = createSeedSnapshot()

  async load(): Promise<AppDataSnapshot> {
    return {
      hosps: this.data.hosps.map(item => ({ ...item })),
      admins: this.data.admins.map(item => ({ ...item })),
      diwanDepts: this.data.diwanDepts.map(item => ({ ...item })),
      diwanWf: this.data.diwanWf.map(item => ({ ...item })),
      wf: this.data.wf.map(item => ({ ...item })),
      workforceSpecializations: structuredClone(this.data.workforceSpecializations),
      directorateUnits: this.data.directorateUnits.map(item => ({ ...item })),
      directorateManager: this.data.directorateManager,
      changeLog: this.data.changeLog.map(item => ({ ...item })),
    }
  }

  async updateHospital(id: string, patch: Partial<Omit<Hospital, 'id'>>): Promise<Hospital> {
    const item = this.data.hosps.find(h => h.id === id)
    if (!item) throw new Error(`Unknown hospital: ${id}`)
    Object.assign(item, patch)
    return { ...item }
  }

  async updateAdministration(id: string, patch: Partial<Omit<Administration, 'id'>>): Promise<Administration> {
    const item = this.data.admins.find(a => a.id === id)
    if (!item) throw new Error(`Unknown administration: ${id}`)
    Object.assign(item, patch)
    return { ...item }
  }

  async saveDiwanData(input: DiwanData): Promise<DiwanData> {
    if (input.departments.some(d => !this.data.diwanDepts.some(current => current.id === d.id)) ||
        input.workforce.some(w => !this.data.diwanWf.some(current => current.id === w.id))) {
      throw new Error('Unknown diwan record')
    }
    this.data.diwanDepts = input.departments.map(d => ({ ...d }))
    this.data.diwanWf = input.workforce.map(w => ({ ...w }))
    return {
      departments: this.data.diwanDepts.map(d => ({ ...d })),
      workforce: this.data.diwanWf.map(w => ({ ...w })),
    }
  }

  async createDiwanDept(input: NewDiwanDept): Promise<DiwanDept> {
    const item = { ...input, id: `diwan-dept-${crypto.randomUUID()}` }
    this.data.diwanDepts.push(item)
    return { ...item }
  }

  async deleteDiwanDept(id: string): Promise<void> {
    const index = this.data.diwanDepts.findIndex(d => d.id === id)
    if (index < 0) throw new Error(`Unknown diwan department: ${id}`)
    this.data.diwanDepts.splice(index, 1)
  }

  async appendChange(entry: ChangeLogEntry): Promise<ChangeLogEntry> {
    const saved = { ...entry }
    this.data.changeLog.push(saved)
    return saved
  }
}
