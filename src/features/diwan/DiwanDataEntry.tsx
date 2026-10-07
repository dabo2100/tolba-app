import { useState } from 'react'
import { useAppData } from '../../state/AppDataContext'
import FormField from '../../components/common/FormField'
import SaveBtn from '../../components/common/SaveBtn'
import EntryHeader from '../../components/common/EntryHeader'

export default function DiwanDataEntry() {
  const { diwanDepts, diwanWf, saveDiwanData, addDiwanDept, removeDiwanDept, logChange } = useAppData()
  const [depts, setDepts] = useState(() => diwanDepts.map(d => ({ ...d })))
  const [wfLocal, setWfLocal] = useState(() => diwanWf.map(w => ({ ...w })))
  const [newDept, setNewDept] = useState({ name: '', icon: '🏢', head: '', type: 'فنية' as 'فنية' | 'إدارية', staff: 0 })
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    try {
      await saveDiwanData({ departments: depts, workforce: wfLocal })
      await logChange('ديوان المديرية', `تحديث بيانات الديوان: ${depts.length} إدارة، ${depts.reduce((s, d) => s + d.staff, 0)} كادر`)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setSaveError('تعذر حفظ بيانات الديوان. حاول مرة أخرى.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <EntryHeader title="ديوان المديرية" subtitle="إدخال وتعديل بيانات الإدارات والكوادر" icon="🏤" color="#0d9488" />

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 18px', color: '#16a34a', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ تم حفظ بيانات الديوان بنجاح
        </div>
      )}

      {saveError && <div role="alert" style={{ padding: 12, color: '#dc2626', background: '#fef2f2', borderRadius: 10 }}>{saveError}</div>}

      {/* Departments */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#0f766e,#0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>الإدارات والأقسام ({depts.length})</div>
          <button onClick={() => setShowAdd(!showAdd)} style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>+ إضافة إدارة</button>
        </div>

        {showAdd && (
          <div style={{ padding: '14px 20px', background: '#f0fdfa', borderBottom: '1px solid #ccfbf1', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 10, alignItems: 'end' }}>
            <FormField label="اسم الإدارة" value={newDept.name} type="text" onChange={v => setNewDept(p => ({ ...p, name: v }))} />
            <FormField label="المسؤول" value={newDept.head} type="text" onChange={v => setNewDept(p => ({ ...p, head: v }))} />
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>النوع</label>
              <select value={newDept.type} onChange={e => setNewDept(p => ({ ...p, type: e.target.value as 'فنية' | 'إدارية' }))} style={{ padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 12, fontFamily: 'Cairo, sans-serif', width: '100%', outline: 'none' }}>
                <option>فنية</option><option>إدارية</option>
              </select>
            </div>
            <FormField label="العدد" value={newDept.staff} onChange={v => setNewDept(p => ({ ...p, staff: Number(v) }))} />
            <button onClick={async () => {
              if (!newDept.name) return
              setSaveError('')
              try {
                const saved = await addDiwanDept(newDept)
                setDepts(p => [...p, saved])
                setNewDept({ name: '', icon: '🏢', head: '', type: 'فنية', staff: 0 })
                setShowAdd(false)
              } catch {
                setSaveError('تعذر إضافة الإدارة. حاول مرة أخرى.')
              }
            }}
              style={{ padding: '9px 18px', background: '#0d9488', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', height: 38 }}>إضافة</button>
          </div>
        )}

        <div style={{ maxHeight: 380, overflowY: 'auto' }}>
          {depts.map((d, i) => (
            <div key={i} style={{ padding: '11px 20px', borderBottom: i < depts.length - 1 ? '1px solid #f0fdfa' : 'none', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto auto', gap: 10, alignItems: 'center' }}>
              <input value={d.name} onChange={e => setDepts(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12, fontFamily: 'Cairo, sans-serif', outline: 'none' }} />
              <input value={d.head} onChange={e => setDepts(p => p.map((x, j) => j === i ? { ...x, head: e.target.value } : x))}
                style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 11, fontFamily: 'Cairo, sans-serif', outline: 'none' }} />
              <input type="number" value={d.staff} onChange={e => setDepts(p => p.map((x, j) => j === i ? { ...x, staff: Number(e.target.value) } : x))}
                style={{ padding: '6px 10px', border: '1.5px solid #0d948830', borderRadius: 7, fontSize: 14, fontWeight: 800, color: '#0d9488', fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center' }} />
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: d.type === 'فنية' ? '#ccfbf1' : '#fef3c7', color: d.type === 'فنية' ? '#0d9488' : '#d97706' }}>{d.type}</span>
              <button onClick={async () => {
                setSaveError('')
                try {
                  await removeDiwanDept(d.id)
                  setDepts(p => p.filter(x => x.id !== d.id))
                } catch {
                  setSaveError('تعذر حذف الإدارة. حاول مرة أخرى.')
                }
              }}
                style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Workforce */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0d9488', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0d9488', borderRadius: 2, display: 'inline-block' }} /> توزيع القوى البشرية
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {wfLocal.map((w, i) => (
            <div key={w.label} style={{ background: `${w.color}08`, border: `1.5px solid ${w.color}20`, borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                <span style={{ fontSize: 15 }}>{w.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>{w.label}</span>
              </div>
              <input type="number" value={w.count}
                onChange={e => setWfLocal(p => p.map((x, j) => j === i ? { ...x, count: Number(e.target.value) } : x))}
                style={{ width: '100%', padding: '6px 8px', border: `1.5px solid ${w.color}30`, borderRadius: 7, fontSize: 15, fontWeight: 800, color: w.color, fontFamily: 'Cairo, sans-serif', outline: 'none', background: '#fff', textAlign: 'center' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={handleSave} saving={saving} />
      </div>
    </div>
  )
}
