import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type {
  Administration, AppDataSnapshot, ChangeLogEntry, DiwanDept, Hospital,
} from '../domain/models'
import type { AppDataRepository, DiwanData, NewDiwanDept } from '../data/AppDataRepository'
import { appDataRepository } from '../data/repository'

type AppDataContextValue = AppDataSnapshot & {
  updateHosp: (id: string, patch: Partial<Omit<Hospital, 'id'>>) => Promise<void>
  updateAdmin: (id: string, patch: Partial<Omit<Administration, 'id'>>) => Promise<void>
  saveDiwanData: (input: DiwanData) => Promise<void>
  addDiwanDept: (dept: NewDiwanDept) => Promise<DiwanDept>
  removeDiwanDept: (id: string) => Promise<void>
  logChange: (actor: string, msg: string) => Promise<void>
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function useAppData(): AppDataContextValue {
  const context = useContext(AppDataContext)
  if (!context) throw new Error('useAppData must be used inside AppDataProvider')
  return context
}

export default function AppDataProvider({
  children,
  repository = appDataRepository,
}: {
  children: ReactNode
  repository?: AppDataRepository
}) {
  const [data, setData] = useState<AppDataSnapshot | null>(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    repository.load()
      .then(snapshot => { if (active) { setData(snapshot); setError('') } })
      .catch(() => { if (active) setError('تعذر تحميل بيانات التطبيق') })
    return () => { active = false }
  }, [repository, attempt])

  if (!data) {
    return error ? (
      <div role="alert" style={{ padding: 32, textAlign: 'center' }}>
        {error} <button onClick={() => setAttempt(value => value + 1)}>إعادة المحاولة</button>
      </div>
    ) : <div style={{ padding: 32, textAlign: 'center' }}>جارٍ تحميل البيانات...</div>
  }

  const updateHosp = async (id: string, patch: Partial<Omit<Hospital, 'id'>>) => {
    const saved = await repository.updateHospital(id, patch)
    setData(current => current && ({ ...current, hosps: current.hosps.map(h => h.id === id ? saved : h) }))
  }
  const updateAdmin = async (id: string, patch: Partial<Omit<Administration, 'id'>>) => {
    const saved = await repository.updateAdministration(id, patch)
    setData(current => current && ({ ...current, admins: current.admins.map(a => a.id === id ? saved : a) }))
  }
  const saveDiwanData = async (input: DiwanData) => {
    const saved = await repository.saveDiwanData(input)
    setData(current => current && ({ ...current, diwanDepts: saved.departments, diwanWf: saved.workforce }))
  }
  const addDiwanDept = async (dept: NewDiwanDept) => {
    const saved = await repository.createDiwanDept(dept)
    setData(current => current && ({ ...current, diwanDepts: [...current.diwanDepts, saved] }))
    return saved
  }
  const removeDiwanDept = async (id: string) => {
    await repository.deleteDiwanDept(id)
    setData(current => current && ({ ...current, diwanDepts: current.diwanDepts.filter(d => d.id !== id) }))
  }
  const logChange = async (actor: string, msg: string) => {
    const entry: ChangeLogEntry = { ts: Date.now(), actor, msg }
    const saved = await repository.appendChange(entry)
    setData(current => current && ({ ...current, changeLog: [...current.changeLog, saved] }))
  }

  return (
    <AppDataContext.Provider value={{ ...data, updateHosp, updateAdmin, saveDiwanData, addDiwanDept, removeDiwanDept, logChange }}>
      {children}
    </AppDataContext.Provider>
  )
}
