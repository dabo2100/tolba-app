import { useState, createContext, useContext, useCallback } from 'react'

type Page = 'directorate' | 'diwan' | 'administration' | 'hospital'

// ─── Auth / Role Types ────────────────────────────────────────────────────────
type Role =
  | { type: 'superadmin' }
  | { type: 'diwan' }
  | { type: 'administration'; idx: number }
  | { type: 'hospital'; idx: number }

type AuthUser = { username: string; password: string; role: Role; displayName: string }

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin, allUsers }: { onLogin: (u: AuthUser) => void; allUsers: AuthUser[] }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password) { setError('يرجى إدخال اسم المستخدم وكلمة المرور'); return }
    setLoading(true)
    setTimeout(() => {
      const found = allUsers.find(u => u.username === username && u.password === password)
      if (found) {
        onLogin(found)
      } else {
        setLoading(false)
        setError('اسم المستخدم أو كلمة المرور غير صحيحة')
      }
    }, 1200)
  }

  return (
    <div className="login-wrap">
      {/* Left panel – branding */}
      <div className="login-brand">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1622571451950-8d7b3fa342d8?w=1200&h=900&fit=crop&auto=format"
          alt="مستشفى كفرالشيخ"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(12,74,110,0.97) 0%, rgba(12,74,110,0.75) 40%, rgba(12,74,110,0.3) 100%)',
        }} />
        {/* Content over image */}
        <div style={{ position: 'relative', padding: '48px 52px' }}>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
            {[
              { val: '18', label: 'مستشفى' },
              { val: '11', label: 'إدارة صحية' },
              { val: '+8,000', label: 'كادر طبي' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 14, padding: '14px 22px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: '#bae6fd', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Title */}
          <div style={{ fontSize: 13, color: '#7dd3fc', fontWeight: 600, marginBottom: 10, letterSpacing: 1 }}>
            وزارة الصحة والسكان — محافظة كفرالشيخ
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 14 }}>
            نظام المتابعة اللاحظي<br />للسيد الدكتور وكيل الوزارة
          </div>
          <div style={{ fontSize: 14, color: '#bae6fd', lineHeight: 1.9, maxWidth: 460 }}>
            منظومة متكاملة لإدارة ومتابعة الكوادر البشرية عبر جميع المستشفيات والإدارات الصحية
            التابعة لمديرية الشؤون الصحية بكفرالشيخ — تشمل الأطباء والتمريض والصيادلة وجميع الفنيين والإداريين.
          </div>
          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            {['📊 إحصائيات فورية', '🏥 18 مستشفى', '👥 إدارة الكوادر', '📋 التقارير والمتابعة'].map(f => (
              <span key={f} style={{
                background: 'rgba(56,189,248,0.15)',
                border: '1px solid rgba(56,189,248,0.3)',
                borderRadius: 20, padding: '5px 14px',
                fontSize: 12, color: '#e0f2fe', fontWeight: 600,
              }}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel – login form */}
      <div className="login-panel">
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, boxShadow: '0 4px 16px rgba(3,105,161,0.3)',
          }}>⚕️</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#0c4a6e', lineHeight: 1.2 }}>مديرية الشؤون الصحية</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>نظام المتابعة اللاحظي · كفرالشيخ</div>
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 6 }}>تسجيل الدخول</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 32 }}>
          أدخل بياناتك للوصول إلى النظام
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Username */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 7 }}>
              اسم المستخدم
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                fontSize: 16, color: '#94a3b8', pointerEvents: 'none',
              }}>👤</span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                style={{
                  width: '100%', padding: '12px 44px 12px 16px',
                  border: `1.5px solid ${error ? '#fca5a5' : '#e2e8f0'}`,
                  borderRadius: 10, fontSize: 13, fontFamily: 'Cairo, sans-serif',
                  outline: 'none', color: '#1e293b', background: '#f8fafc',
                  direction: 'rtl', transition: 'border 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#0369a1')}
                onBlur={e => (e.target.style.borderColor = error ? '#fca5a5' : '#e2e8f0')}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 7 }}>
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                fontSize: 16, color: '#94a3b8', pointerEvents: 'none',
              }}>🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                style={{
                  width: '100%', padding: '12px 44px 12px 44px',
                  border: `1.5px solid ${error ? '#fca5a5' : '#e2e8f0'}`,
                  borderRadius: 10, fontSize: 13, fontFamily: 'Cairo, sans-serif',
                  outline: 'none', color: '#1e293b', background: '#f8fafc',
                  direction: 'rtl', transition: 'border 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#0369a1')}
                onBlur={e => (e.target.style.borderColor = error ? '#fca5a5' : '#e2e8f0')}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 15, color: '#94a3b8', padding: 0,
              }}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px',
            background: loading ? '#7dd3fc' : 'linear-gradient(135deg, #0369a1, #0ea5e9)',
            border: 'none', borderRadius: 10, color: '#fff',
            fontSize: 14, fontWeight: 700, fontFamily: 'Cairo, sans-serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 14px rgba(3,105,161,0.35)',
            transition: 'all 0.2s', marginTop: 4,
          }}>
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: '2.5px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }} />
                جارٍ التحقق...
              </>
            ) : 'دخول إلى النظام →'}
          </button>
        </form>

        {/* Hint */}
        <div style={{ marginTop: 20, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, color: '#0369a1', fontWeight: 700, marginBottom: 8 }}>💡 بيانات الدخول التجريبية (كلمة المرور: 1234)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {[
              { u: 'admin',  label: 'مدير النظام — المديرية' },
              { u: 'diwan',  label: 'ديوان المديرية' },
              { u: 'a1',     label: 'إدارة كفرالشيخ' },
              { u: 'a2',     label: 'إدارة دسوق' },
              { u: 'h1',     label: 'مستشفى كفرالشيخ العام' },
              { u: 'h2',     label: 'مستشفى دسوق العام' },
            ].map(r => (
              <div key={r.u} style={{ fontSize: 10, color: '#0369a1', display: 'flex', gap: 5 }}>
                <strong>{r.u}</strong><span style={{ color: '#64748b' }}>—</span><span style={{ color: '#334155' }}>{r.label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 6 }}>a1–a11 للإدارات · h1–h18 للمستشفيات</div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', paddingTop: 36 }}>
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: 14,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
                boxShadow: '0 2px 8px rgba(3,105,161,0.3)',
              }}>💻</div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0c4a6e' }}>م / محمد طلبة</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 18, height: 1, background: '#cbd5e1', display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>جميع الحقوق محفوظة © 2026</span>
              <span style={{ width: 18, height: 1, background: '#cbd5e1', display: 'inline-block' }} />
            </div>
            <div style={{ fontSize: 10, color: '#0369a1', background: '#e0f2fe', borderRadius: 20, padding: '3px 12px', fontWeight: 600 }}>
              نظام المتابعة اللاحظي · مديرية الشؤون الصحية — كفرالشيخ
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

// ─── Diwan Data ───────────────────────────────────────────────────────────────
const diwanDepartments = [
  { name: 'الرقابة الصحية والتفتيش',    icon: '🔍', staff: 41, head: 'د. هشام الدسوقي',      type: 'فنية'    },
  { name: 'التخطيط والمتابعة',           icon: '📈', staff: 27, head: 'د. خالد السيد',        type: 'فنية'    },
  { name: 'تكنولوجيا المعلومات',        icon: '💻', staff: 22, head: 'م. أحمد مصطفى',        type: 'فنية'    },
  { name: 'الصحة الإنجابية وصحة الأم',  icon: '🌸', staff: 33, head: 'د. نادية عبد الله',    type: 'فنية'    },
  { name: 'صحة الطفل والتطعيمات',       icon: '💉', staff: 38, head: 'د. رضا البحراوي',      type: 'فنية'    },
  { name: 'التثقيف الصحي',              icon: '📚', staff: 16, head: 'أ. سمر محمود',         type: 'فنية'    },
  { name: 'إدارة الأمراض المزمنة',      icon: '❤️‍🩹', staff: 24, head: 'د. عمرو عبد الرازق',  type: 'فنية'    },
  { name: 'الرعاية الصحية الأولية',     icon: '🏥', staff: 44, head: 'د. إيمان السيد',       type: 'فنية'    },
  { name: 'الشؤون الإدارية والمالية',   icon: '📁', staff: 48, head: 'أ. سامي عبد الفتاح',  type: 'إدارية'  },
  { name: 'الموارد البشرية',             icon: '👥', staff: 32, head: 'أ. منى إبراهيم',       type: 'إدارية'  },
  { name: 'الشؤون القانونية',           icon: '⚖️', staff: 14, head: 'م. رانيا حسن',         type: 'إدارية'  },
  { name: 'العلاقات العامة والإعلام',   icon: '📢', staff: 18, head: 'أ. ياسمين فوزي',       type: 'إدارية'  },
  { name: 'المالية والحسابات',           icon: '💰', staff: 35, head: 'أ. محمود الشوربجي',    type: 'إدارية'  },
  { name: 'إدارة المخازن والتجهيزات',   icon: '📦', staff: 29, head: 'أ. وليد عثمان',        type: 'إدارية'  },
]

const diwanWorkforce = [
  { label: 'أطباء بشري',         icon: '👨‍⚕️', count: 68,  color: '#0369a1' },
  { label: 'أطباء أسنان',        icon: '🦷',   count: 22,  color: '#7c3aed' },
  { label: 'صيادلة',             icon: '💊',   count: 31,  color: '#d97706' },
  { label: 'تمريض',              icon: '🩺',   count: 145, color: '#16a34a' },
  { label: 'علاج طبيعي',         icon: '🏃',   count: 18,  color: '#0d9488' },
  { label: 'أخصائي علوم صحية',  icon: '🔬',   count: 42,  color: '#dc2626' },
  { label: 'فنيون',              icon: '🔧',   count: 58,  color: '#ea580c' },
  { label: 'إداريون',            icon: '📁',   count: 201, color: '#6d28d9' },
]

const directorateManager = 'د. محمد أبوالسعد'

// ─── App Data Context ─────────────────────────────────────────────────────────
type Hospital = typeof hospitals[0]
type Administration = typeof administrations[0]
type DiwanDept = typeof diwanDepartments[0]
type DiwanWfItem = typeof diwanWorkforce[0]
type WfItem = typeof workforce[0]

type AppDataCtxType = {
  hosps: Hospital[]
  admins: Administration[]
  diwanDepts: DiwanDept[]
  diwanWf: DiwanWfItem[]
  wf: WfItem[]
  updateHosp: (idx: number, patch: Partial<Hospital>) => void
  updateAdmin: (idx: number, patch: Partial<Administration>) => void
  updateDiwanDept: (idx: number, patch: Partial<DiwanDept>) => void
  addDiwanDept: (dept: DiwanDept) => void
  removeDiwanDept: (idx: number) => void
  updateDiwanWfCount: (idx: number, count: number) => void
  addHosp: (h: Hospital) => void
  removeHosp: (idx: number) => void
  addAdmin: (a: Administration) => void
  removeAdmin: (idx: number) => void
  changeLog: { ts: number; actor: string; msg: string }[]
  logChange: (actor: string, msg: string) => void
}

const AppDataCtx = createContext<AppDataCtxType>(null!)

function useAppData() { return useContext(AppDataCtx) }

// ─── All Users ────────────────────────────────────────────────────────────────
const buildAllUsers = (hosps: Hospital[], admins: Administration[]): AuthUser[] => [
  { username: 'admin',   password: '1234', role: { type: 'superadmin' },             displayName: 'م / محمد طلبة' },
  { username: 'diwan',   password: '1234', role: { type: 'diwan' },                  displayName: 'ديوان المديرية' },
  ...admins.map((a, i): AuthUser => ({
    username: `a${i + 1}`, password: '1234',
    role: { type: 'administration', idx: i },
    displayName: `إدارة ${a.name} الصحية`,
  })),
  ...hosps.map((h, i): AuthUser => ({
    username: `h${i + 1}`, password: '1234',
    role: { type: 'hospital', idx: i },
    displayName: h.name,
  })),
]

// ─── Diwan Dept Modal ─────────────────────────────────────────────────────────
function DiwanDeptModal({ dept, totalDiwanStaff, onClose }: {
  dept: DiwanDept; totalDiwanStaff: number; onClose: () => void
}) {
  const [specModal, setSpecModal] = useState<{ label: string; total: number } | null>(null)
  const totalWfDirectorate = workforce.reduce((s, w) => s + w.directorate, 0)
  const scale = totalWfDirectorate > 0 ? dept.staff / totalWfDirectorate : 0
  const deptWf = workforce.map(w => ({
    ...w,
    val: Math.max(1, Math.round(w.directorate * scale)),
  }))
  const deptTotal = deptWf.reduce((s, w) => s + w.val, 0)
  const isAdmin = dept.type === 'إدارية'
  const accentColor = isAdmin ? '#d97706' : '#0d9488'
  const accentLight = isAdmin ? '#fef3c7' : '#ccfbf1'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 820,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28)', overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: isAdmin
            ? 'linear-gradient(135deg, #78350f 0%, #d97706 100%)'
            : 'linear-gradient(135deg, #064e3b 0%, #0d9488 100%)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', left: 60, bottom: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>{dept.icon}</div>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 3 }}>
                {isAdmin ? 'إدارة إدارية' : 'إدارة فنية'} · ديوان المديرية
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{dept.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>
                رئيس الإدارة: <strong style={{ color: '#fff' }}>{dept.head}</strong>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '10px 18px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{dept.staff}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>إجمالي الكوادر</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '10px 18px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
                {totalDiwanStaff > 0 ? ((dept.staff / totalDiwanStaff) * 100).toFixed(1) : '0'}%
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>من إجمالي الديوان</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, color: '#fff', backdropFilter: 'blur(8px)',
          }}>✕</button>
        </div>

        {/* Section label */}
        <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 4, height: 16, background: accentColor, borderRadius: 2, display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>توزيع القوى البشرية</span>
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>اضغط على الفئة لعرض التخصصات</span>
        </div>

        {/* Workforce grid */}
        <div style={{ padding: '14px 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, overflowY: 'auto' }}>
          {deptWf.map(w => {
            const pct = deptTotal > 0 ? w.val / deptTotal : 0
            const r = 26, circ = 2 * Math.PI * r
            const dash = circ * pct
            const hasSpec = !!workforceSpecializations[w.label]
            return (
              <div key={w.label}
                onClick={() => hasSpec && setSpecModal({ label: w.label, total: w.val })}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 6, padding: '14px 8px', borderRadius: 12,
                  background: '#f8fafc', border: `1.5px solid ${w.color}18`,
                  cursor: hasSpec ? 'pointer' : 'default',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (hasSpec) { e.currentTarget.style.background = `${w.color}0e`; e.currentTarget.style.borderColor = `${w.color}45` } }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = `${w.color}18` }}
              >
                <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                  <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={32} cy={32} r={r} fill="none" stroke={`${w.color}1a`} strokeWidth={8} />
                    <circle cx={32} cy={32} r={r} fill="none" stroke={w.color} strokeWidth={8}
                      strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {w.icon}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: w.color, lineHeight: 1 }}>{w.val.toLocaleString('ar-EG')}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: w.color, borderRadius: 10, padding: '1px 7px' }}>
                  {(pct * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', lineHeight: 1.4, fontWeight: 600 }}>{w.label}</div>
                {hasSpec && <div style={{ fontSize: 8, color: w.color, opacity: 0.7, marginTop: -2 }}>اضغط للتفاصيل ▼</div>}
              </div>
            )
          })}
        </div>

        {/* Total footer */}
        <div style={{
          padding: '12px 24px',
          background: `${accentColor}08`, borderTop: `2px solid ${accentColor}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>∑ إجمالي القوى البشرية للإدارة</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: accentColor }}>{deptTotal.toLocaleString('ar-EG')} كادر</span>
        </div>
      </div>

      {specModal && (
        <WorkforceModal
          category={specModal.label}
          total={specModal.total}
          onClose={() => setSpecModal(null)}
        />
      )}
    </div>
  )
}

// ─── Diwan Page ────────────────────────────────────────────────────────────────
function DiwanPage() {
  const { diwanDepts: diwanDepartments, diwanWf: diwanWorkforce } = useAppData()
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  const [deptModal, setDeptModal] = useState<DiwanDept | null>(null)
  const totalDiwanStaff = diwanWorkforce.reduce((s, w) => s + w.count, 0)
  const technicalDepts = diwanDepartments.filter(d => d.type === 'فنية')
  const adminDepts = diwanDepartments.filter(d => d.type === 'إدارية')
  const maxStaff = Math.max(...diwanDepartments.map(d => d.staff))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Director Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)',
        borderRadius: 14, padding: '16px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(3,105,161,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚕️</div>
          <div>
            <div style={{ fontSize: 10, color: '#7dd3fc', fontWeight: 600, marginBottom: 3 }}>مدير مديرية الشؤون الصحية — كفرالشيخ</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{directorateManager}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 20px' }}>
          <div style={{ fontSize: 9, color: '#bae6fd', marginBottom: 3 }}>🏤 ديوان المديرية</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{diwanDepartments.length} إدارة</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-4">
        <StatCard large label="إجمالي الكوادر البشرية" value={totalDiwanStaff} unit="موظف" icon="👥" color="#0369a1" light="#e0f2fe" />
        <StatCard large label="رؤساء الأقسام والإدارات" value={diwanDepartments.length} unit="رئيس" icon="👔" color="#7c3aed" light="#ede9fe" />
        <StatCard large label="الإدارات الفنية" value={technicalDepts.length} unit="إدارة" icon="🔬" color="#0d9488" light="#ccfbf1" />
        <StatCard large label="الإدارات الإدارية" value={adminDepts.length} unit="إدارة" icon="📁" color="#d97706" light="#fef3c7" />
      </div>

      {/* Departments side by side */}
      <div className="grid-2col-eq">

        {/* Technical */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <SectionHeader title={`الإدارات الفنية (${technicalDepts.length})`} subtitle="اضغط على إدارة لعرض تفاصيل الكوادر" color="#064e3b" color2="#0d9488" />
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {technicalDepts.map((dept, i) => (
              <div key={i}
                onClick={() => setDeptModal(dept)}
                style={{
                  padding: '12px 18px', borderBottom: i < technicalDepts.length - 1 ? '1px solid #f0fdf4' : 'none',
                  display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f0fdf4')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{dept.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{dept.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{dept.head}</div>
                  <div style={{ height: 3, background: '#f0fdf4', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, background: '#0d9488', width: `${(dept.staff / maxStaff) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#ccfbf1', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 800, color: '#0d9488', flexShrink: 0 }}>{dept.staff}</div>
                  <span style={{ fontSize: 12, color: '#0d9488', opacity: 0.6 }}>←</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Administrative */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <SectionHeader title={`الإدارات الإدارية (${adminDepts.length})`} subtitle="اضغط على إدارة لعرض تفاصيل الكوادر" color="#78350f" color2="#d97706" />
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {adminDepts.map((dept, i) => (
              <div key={i}
                onClick={() => setDeptModal(dept)}
                style={{
                  padding: '12px 18px', borderBottom: i < adminDepts.length - 1 ? '1px solid #fffbeb' : 'none',
                  display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fffbeb')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{dept.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{dept.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{dept.head}</div>
                  <div style={{ height: 3, background: '#fffbeb', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, background: '#d97706', width: `${(dept.staff / maxStaff) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#fef3c7', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 800, color: '#d97706', flexShrink: 0 }}>{dept.staff}</div>
                  <span style={{ fontSize: 12, color: '#d97706', opacity: 0.6 }}>←</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
      {deptModal && (
        <DiwanDeptModal
          dept={deptModal}
          totalDiwanStaff={totalDiwanStaff}
          onClose={() => setDeptModal(null)}
        />
      )}
    </div>
  )
}

// ─── Hospitals Data (18) ──────────────────────────────────────────────────────
const hospitals = [
  { name: 'مستشفى كفرالشيخ العام',             type: 'عام',     staff: 520, beds: 350, manager: 'د. أحمد سعيد محمد'        },
  { name: 'مستشفى دسوق العام',                 type: 'عام',     staff: 480, beds: 300, manager: 'د. وليد عبد الرحمن'       },
  { name: 'مستشفى سيدي غازي النموذجي',        type: 'نموذجي',  staff: 310, beds: 200, manager: 'د. علاء الدين حسين'       },
  { name: 'مستشفى بيلا النموذجي',             type: 'نموذجي',  staff: 290, beds: 180, manager: 'د. محمود الشافعي'          },
  { name: 'مستشفى سيدي سالم المركزي',         type: 'مركزي',   staff: 380, beds: 250, manager: 'د. هشام الدسوقي'           },
  { name: 'مستشفى فوة المركزي',               type: 'مركزي',   staff: 360, beds: 220, manager: 'د. خالد السيد علي'         },
  { name: 'مستشفى مطوبس المركزي',             type: 'مركزي',   staff: 340, beds: 210, manager: 'د. رضا عبد الفتاح'         },
  { name: 'مستشفى الرياض المركزي',            type: 'مركزي',   staff: 320, beds: 200, manager: 'د. سامي البحراوي'           },
  { name: 'مستشفى الحامول المركزي',           type: 'مركزي',   staff: 300, beds: 190, manager: 'د. عمرو عبد الرازق'        },
  { name: 'مستشفى برج البرلس المركزي',        type: 'مركزي',   staff: 280, beds: 170, manager: 'د. إيهاب النجار'           },
  { name: 'مستشفى صدر كفرالشيخ',             type: 'نوعي',    staff: 210, beds: 120, manager: 'د. مصطفى العمروسي'          },
  { name: 'مستشفى حميات كفرالشيخ',           type: 'نوعي',    staff: 195, beds: 100, manager: 'د. نادية عبد الله'          },
  { name: 'مستشفى الأمراض الجلدية والجزام',   type: 'نوعي',    staff: 185, beds: 90,  manager: 'د. إيمان السيد محمد'       },
  { name: 'مستشفى رمد كفرالشيخ',             type: 'نوعي',    staff: 175, beds: 80,  manager: 'د. طارق عبد الحميد'        },
  { name: 'مستشفى حميات دسوق',               type: 'نوعي',    staff: 190, beds: 100, manager: 'د. سمير إبراهيم فرج'       },
  { name: 'مستشفى فيصل سعود',                type: 'نوعي',    staff: 240, beds: 130, manager: 'د. أشرف الجوهري'            },
  { name: 'مستشفى حميات مطوبس',              type: 'نوعي',    staff: 160, beds: 80,  manager: 'د. يسرى محمد الشاذلي'      },
  { name: 'مستشفى حميات بيلا',               type: 'نوعي',    staff: 155, beds: 75,  manager: 'د. منى إبراهيم'            },
]

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  'عام':     { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' },
  'نموذجي': { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
  'مركزي':  { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
  'نوعي':   { bg: '#ede9fe', text: '#7c3aed', border: '#ddd6fe' },
}

// ─── Administrations Data (11) ────────────────────────────────────────────────
const administrations = [
  { name: 'كفرالشيخ',   staff: 1240, units: 18, manager: 'د. علي حسن عبد الله'       },
  { name: 'دسوق',        staff: 980,  units: 14, manager: 'د. محمد صلاح الدين'         },
  { name: 'سيدي سالم',  staff: 620,  units: 9,  manager: 'د. حسام محمود فوزي'         },
  { name: 'فوة',         staff: 540,  units: 8,  manager: 'د. شريف عبد الغني'          },
  { name: 'مطوبس',       staff: 710,  units: 11, manager: 'د. ياسر إبراهيم السيد'      },
  { name: 'قلين',        staff: 590,  units: 8,  manager: 'د. أمل عبد المنعم'           },
  { name: 'بيلا',        staff: 670,  units: 10, manager: 'د. عصام الدين حلمي'         },
  { name: 'الحامول',    staff: 480,  units: 7,  manager: 'د. فاطمة زكريا محمد'        },
  { name: 'بلطيم',       staff: 420,  units: 6,  manager: 'د. محمد عبد الصمد'          },
  { name: 'الرياض',      staff: 390,  units: 6,  manager: 'د. نور الدين مصطفى'         },
  { name: 'سيدي غازي',  staff: 350,  units: 5,  manager: 'د. سحر رمضان علي'           },
]

// ─── Workforce ────────────────────────────────────────────────────────────────
const workforce = [
  { label: 'أطباء بشري',          icon: '👨‍⚕️', directorate: 1240, administration: 310, hospital: 186, color: '#0369a1' },
  { label: 'أطباء أسنان',         icon: '🦷',   directorate: 420,  administration: 105, hospital: 63,  color: '#7c3aed' },
  { label: 'علاج طبيعي',          icon: '🏃',   directorate: 310,  administration: 78,  hospital: 47,  color: '#0d9488' },
  { label: 'صيادلة',              icon: '💊',   directorate: 530,  administration: 133, hospital: 80,  color: '#d97706' },
  { label: 'تمريض',               icon: '🩺',   directorate: 2840, administration: 710, hospital: 426, color: '#16a34a' },
  { label: 'فنيون',               icon: '🔧',   directorate: 920,  administration: 230, hospital: 138, color: '#ea580c' },
  { label: 'كيميائي',             icon: '🧪',   directorate: 80,   administration: 20,  hospital: 12,  color: '#dc2626' },
  { label: 'إداريون والكتبة',     icon: '📁',   directorate: 1100, administration: 275, hospital: 165, color: '#6d28d9' },
  { label: 'أخصائي اجتماعي',     icon: '🤝',   directorate: 120,  administration: 30,  hospital: 18,  color: '#0891b2' },
  { label: 'أخصائي نفسي',        icon: '🧠',   directorate: 90,   administration: 22,  hospital: 13,  color: '#be185d' },
  { label: 'مهندس أجهزة طبية',   icon: '⚙️',   directorate: 60,   administration: 15,  hospital: 9,   color: '#4f46e5' },
  { label: 'عمال',                icon: '👷',   directorate: 1200, administration: 300, hospital: 180, color: '#78716c' },
]

// ─── Workforce Specializations ────────────────────────────────────────────────
type SpecRow = { name: string; g1: number; g2: number; g3: number; g4?: number }
type SimpleSpec = { name: string; count: number }
type SpecData = {
  gradeLabels: string[]
  icon: string; color: string
  specs?: SpecRow[]
  simpleGrades?: number[]
  simpleSpecs?: SimpleSpec[]
}

const workforceSpecializations: Record<string, SpecData> = {
  'أطباء بشري': {
    gradeLabels: ['استشاري', 'أخصائي', 'ممارس', 'مقيم'],
    icon: '👨‍⚕️', color: '#0369a1',
    specs: [
      { name: 'نساء وتوليد',              g1: 18, g2: 46, g3: 30, g4: 16 },
      { name: 'جراحة عامة',               g1: 16, g2: 42, g3: 28, g4: 14 },
      { name: 'باطنة عامة',               g1: 14, g2: 36, g3: 24, g4: 12 },
      { name: 'أطفال',                     g1: 12, g2: 30, g3: 20, g4: 10 },
      { name: 'تخدير',                     g1: 10, g2: 26, g3: 18, g4:  9 },
      { name: 'جراحة عظام',               g1: 10, g2: 24, g3: 16, g4:  8 },
      { name: 'قلب وأوعية دموية',         g1:  9, g2: 22, g3: 15, g4:  7 },
      { name: 'استقبال وطوارئ',           g1:  7, g2: 20, g3: 13, g4:  7 },
      { name: 'أشعة تشخيصية',             g1:  7, g2: 18, g3: 12, g4:  6 },
      { name: 'عناية مركزة',              g1:  6, g2: 16, g3: 11, g4:  5 },
      { name: 'رمد',                       g1:  5, g2: 14, g3:  9, g4:  5 },
      { name: 'جلدية وتناسلية',           g1:  5, g2: 13, g3:  9, g4:  4 },
      { name: 'نفسية وعصبية',             g1:  5, g2: 13, g3:  9, g4:  4 },
      { name: 'أنف وأذن',                 g1:  4, g2: 12, g3:  8, g4:  4 },
      { name: 'جهاز هضمي وكبد',           g1:  4, g2: 12, g3:  8, g4:  4 },
      { name: 'أمراض صدرية',              g1:  4, g2: 11, g3:  7, g4:  3 },
      { name: 'جراحة مسالك بولية',        g1:  4, g2: 11, g3:  7, g4:  3 },
      { name: 'كلى صناعي',                g1:  3, g2: 10, g3:  7, g4:  3 },
      { name: 'حميات',                    g1:  3, g2: 10, g3:  6, g4:  3 },
      { name: 'أطفال حديثي الولادة',      g1:  3, g2:  9, g3:  6, g4:  3 },
      { name: 'جراحة مخ وأعصاب',          g1:  3, g2:  9, g3:  6, g4:  2 },
      { name: 'جراحة قلب وصدر',           g1:  3, g2:  9, g3:  6, g4:  2 },
      { name: 'جراحة أوعية دموية',        g1:  2, g2:  8, g3:  5, g4:  2 },
      { name: 'روماتيزم وتأهيل',          g1:  2, g2:  8, g3:  5, g4:  2 },
      { name: 'باثولوجي إكلينيكي',        g1:  2, g2:  7, g3:  4, g4:  2 },
      { name: 'حروق وجراحة تجميل',        g1:  2, g2:  7, g3:  4, g4:  2 },
      { name: 'جراحة أطفال',              g1:  2, g2:  7, g3:  4, g4:  2 },
      { name: 'باثولوجي',                 g1:  2, g2:  6, g3:  4, g4:  2 },
      { name: 'بكتريولوجي',               g1:  2, g2:  5, g3:  3, g4:  2 },
      { name: 'بنك دم',                   g1:  2, g2:  5, g3:  3, g4:  2 },
      { name: 'طب مسنين',                 g1:  1, g2:  4, g3:  3, g4:  1 },
      { name: 'طب نووي',                  g1:  1, g2:  4, g3:  3, g4:  1 },
      { name: 'تخاطب وسمعيات',            g1:  1, g2:  3, g3:  2, g4:  1 },
      { name: 'الوراثة',                  g1:  1, g2:  3, g3:  2, g4:  1 },
    ],
  },
  'أطباء أسنان': {
    gradeLabels: ['استشاري', 'أخصائي', 'م. أخصائي', 'مقيم مؤهل', 'مقيم'],
    icon: '🦷', color: '#7c3aed',
    simpleGrades: [45, 120, 95, 85, 75],
  },
  'علاج طبيعي': {
    gradeLabels: ['أخصائي', 'ممارس'],
    icon: '🏃', color: '#0d9488',
    simpleGrades: [140, 170],
  },
  'صيادلة': {
    gradeLabels: ['مؤهل عالي'],
    icon: '💊', color: '#d97706',
    simpleGrades: [530],
  },
  'تمريض': {
    gradeLabels: ['مؤهل عالي', 'مؤهل فوق متوسط', 'مؤهل متوسط'],
    icon: '🩺', color: '#16a34a',
    simpleGrades: [580, 980, 1280],
  },
  'فنيون': {
    gradeLabels: [],
    icon: '🔧', color: '#ea580c',
    simpleSpecs: [
      { name: 'فني معمل ومساعد فني',      count: 120 },
      { name: 'أشعة',                      count: 100 },
      { name: 'تخدير',                     count:  90 },
      { name: 'أجهزة طبية',               count:  85 },
      { name: 'مراقب صحي',                count:  80 },
      { name: 'أسنان',                     count:  75 },
      { name: 'خدمات طبية',               count:  70 },
      { name: 'صيانة',                     count:  65 },
      { name: 'فني مسعف',                 count:  60 },
      { name: 'إحصاء',                     count:  55 },
      { name: 'أخصائي وفني تغذية',        count:  50 },
      { name: 'فني هندسة',                count:  30 },
      { name: 'فني بصريات',               count:  25 },
      { name: 'زراعي',                     count:  15 },
    ],
  },
  'كيميائي': {
    gradeLabels: ['كيميائي'],
    icon: '🧪', color: '#dc2626',
    simpleGrades: [80],
  },
  'إداريون والكتبة': {
    gradeLabels: ['مؤهل عالي', 'مؤهل متوسط'],
    icon: '📁', color: '#6d28d9',
    simpleGrades: [440, 660],
  },
  'أخصائي اجتماعي': {
    gradeLabels: ['أخصائي اجتماعي'],
    icon: '🤝', color: '#0891b2',
    simpleGrades: [120],
  },
  'أخصائي نفسي': {
    gradeLabels: ['أخصائي نفسي'],
    icon: '🧠', color: '#be185d',
    simpleGrades: [90],
  },
  'مهندس أجهزة طبية': {
    gradeLabels: ['مهندس أجهزة طبية'],
    icon: '⚙️', color: '#4f46e5',
    simpleGrades: [60],
  },
  'عمال': {
    gradeLabels: ['معين', 'موسمي'],
    icon: '👷', color: '#78716c',
    simpleGrades: [900, 300],
  },
}

// ─── Workforce Modal ───────────────────────────────────────────────────────────
const gradeColors = ['#0369a1', '#0d9488', '#7c3aed', '#e11d48', '#f59e0b']

function WorkforceModal({ category, total, onClose }: { category: string; total: number; onClose: () => void }) {
  const data = workforceSpecializations[category]
  if (!data) return null

  const wf = workforce.find(x => x.label === category)
  const baseTotal = wf ? wf.directorate : total
  const scale = baseTotal > 0 ? total / baseTotal : 1

  const numGrades = data.gradeLabels.length
  const isSimpleGrades = !!data.simpleGrades
  const isSimpleSpecs = !!data.simpleSpecs
  const hasFourGrades = numGrades === 4
  const scaledGrades = data.simpleGrades
    ? data.simpleGrades.map(v => Math.max(1, Math.round(v * scale)))
    : null

  const scaledSpecs = data.simpleSpecs
    ? data.simpleSpecs.map(s => ({ name: s.name, count: Math.max(0, Math.round(s.count * scale)) }))
    : null

  const specs = data.specs
    ? data.specs.map(s => ({
        name: s.name,
        g1: Math.max(0, Math.round(s.g1 * scale)),
        g2: Math.max(0, Math.round(s.g2 * scale)),
        g3: Math.max(0, Math.round(s.g3 * scale)),
        g4: s.g4 != null ? Math.max(0, Math.round(s.g4 * scale)) : undefined,
      }))
    : []

  const g1Total = specs.reduce((s, r) => s + r.g1, 0)
  const g2Total = specs.reduce((s, r) => s + r.g2, 0)
  const g3Total = specs.reduce((s, r) => s + r.g3, 0)
  const g4Total = specs.reduce((s, r) => s + (r.g4 ?? 0), 0)
  const grandTotal = isSimpleGrades && scaledGrades
    ? scaledGrades.reduce((s, v) => s + v, 0)
    : total
  const maxRow = specs.length ? Math.max(...specs.map(s => s.g1 + s.g2 + s.g3 + (s.g4 ?? 0))) : 1
  const [g1L, g2L, g3L, g4L] = data.gradeLabels as [string, string, string?, string?]

  const gridCols = hasFourGrades ? '1fr 62px 62px 62px 62px 80px' : '1fr 80px 80px 80px 90px'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: hasFourGrades ? 860 : 760,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
        overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: `linear-gradient(135deg, ${data.color}f0 0%, ${data.color} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', right: 40, bottom: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, backdropFilter: 'blur(8px)' }}>{data.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.3px' }}>{category}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3, display: 'flex', gap: 12 }}>
                <span>الإجمالي: <strong style={{ color: '#fff', fontSize: 14 }}>{total.toLocaleString('ar-EG')}</strong></span>
                {!isSimpleGrades && !isSimpleSpecs && specs.length > 0 && <span>{specs.length} تخصص</span>}
                {isSimpleSpecs && scaledSpecs && <span>{scaledSpecs.length} تخصص</span>}
              </div>
            </div>
          </div>
          {/* Grade summary pills */}
          <div style={{ display: 'flex', gap: 6, position: 'relative', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 320 }}>
            {isSimpleGrades && scaledGrades ? (
              scaledGrades.map((v, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '7px 12px', textAlign: 'center', backdropFilter: 'blur(8px)', minWidth: 60 }}>
                  <div style={{ fontSize: numGrades > 3 ? 14 : 18, fontWeight: 900, color: '#fff' }}>{v.toLocaleString('ar-EG')}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 1 }}>{data.gradeLabels[i]}</div>
                </div>
              ))
            ) : isSimpleSpecs ? (
              <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '7px 16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{total.toLocaleString('ar-EG')}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 1 }}>{(scaledSpecs ?? []).length} تخصص</div>
              </div>
            ) : (
              ([{ l: g1L, v: g1Total }, { l: g2L, v: g2Total }, { l: g3L!, v: g3Total }, ...(hasFourGrades ? [{ l: g4L!, v: g4Total }] : [])] as { l: string; v: number }[]).map((x, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 10, padding: '7px 12px', textAlign: 'center', backdropFilter: 'blur(8px)', minWidth: 60 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>{x.v.toLocaleString('ar-EG')}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 1 }}>{x.l}</div>
                </div>
              ))
            )}
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, color: '#fff', backdropFilter: 'blur(8px)',
          }}>✕</button>
        </div>

        {/* Simple grades — 1 or 2 grades: donut charts; 3+ grades: compact cards */}
        {isSimpleGrades && scaledGrades && (
          numGrades <= 2 ? (
            <div style={{ padding: 32, display: 'flex', gap: 20, justifyContent: 'center' }}>
              {scaledGrades.map((v, i) => {
                const pct = grandTotal > 0 ? (v / grandTotal) * 100 : 0
                const r = 52, circ = 2 * Math.PI * r
                const col = gradeColors[i] ?? data.color
                return (
                  <div key={i} style={{
                    flex: 1, background: '#f8fafc', borderRadius: 16, padding: '28px 24px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                    border: `2px solid ${col}22`,
                  }}>
                    <div style={{ position: 'relative', width: 120, height: 120 }}>
                      <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx={60} cy={60} r={r} fill="none" stroke="#e2e8f0" strokeWidth={10} />
                        <circle cx={60} cy={60} r={r} fill="none" stroke={col} strokeWidth={10}
                          strokeDasharray={`${circ * (pct / 100)} ${circ}`} strokeLinecap="round" />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: col }}>{pct.toFixed(0)}%</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{v.toLocaleString('ar-EG')}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: col, background: `${col}14`, padding: '6px 18px', borderRadius: 20 }}>
                      {data.gradeLabels[i]}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Total bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>توزيع الدرجات الوظيفية</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: data.color }}>{grandTotal.toLocaleString('ar-EG')} إجمالي</span>
              </div>
              {scaledGrades.map((v, i) => {
                const pct = grandTotal > 0 ? (v / grandTotal) * 100 : 0
                const col = gradeColors[i] ?? data.color
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 110, fontSize: 12, fontWeight: 700, color: '#1e293b', textAlign: 'right', flexShrink: 0 }}>
                      {data.gradeLabels[i]}
                    </div>
                    <div style={{ flex: 1, height: 28, background: '#f1f5f9', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        height: '100%', borderRadius: 8,
                        background: `linear-gradient(90deg, ${col}cc, ${col})`,
                        width: `${pct}%`, transition: 'width 0.6s ease',
                        display: 'flex', alignItems: 'center', paddingRight: 10, justifyContent: 'flex-end',
                      }}>
                        {pct > 10 && <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>{pct.toFixed(1)}%</span>}
                      </div>
                    </div>
                    <div style={{
                      width: 56, textAlign: 'center', fontSize: 14, fontWeight: 900, color: col,
                      background: `${col}10`, borderRadius: 8, padding: '4px 6px', flexShrink: 0,
                    }}>{v.toLocaleString('ar-EG')}</div>
                  </div>
                )
              })}
            </div>
          )
        )}

        {/* Simple specs — list with single count per spec (e.g. فنيون) */}
        {isSimpleSpecs && scaledSpecs && (
          <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {scaledSpecs.map((s, i) => {
                const maxCount = Math.max(...scaledSpecs.map(x => x.count))
                const pct = maxCount > 0 ? (s.count / maxCount) * 100 : 0
                return (
                  <div key={i} style={{
                    background: '#f8fafc', borderRadius: 12, padding: '14px 16px',
                    border: `1.5px solid ${data.color}18`,
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${data.color}0a`; e.currentTarget.style.borderColor = `${data.color}40` }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = `${data.color}18` }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>{s.name}</div>
                      <div style={{ height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 3, background: data.color, width: `${pct}%`, transition: 'width 0.5s' }} />
                      </div>
                    </div>
                    <div style={{
                      fontSize: 18, fontWeight: 900, color: data.color,
                      background: `${data.color}12`, borderRadius: 10,
                      padding: '6px 12px', flexShrink: 0,
                    }}>{s.count.toLocaleString('ar-EG')}</div>
                  </div>
                )
              })}
            </div>
            {/* Footer total */}
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: `${data.color}08`, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              border: `1px solid ${data.color}20`,
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: data.color }}>∑ الإجمالي الكلي</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: data.color }}>
                {scaledSpecs.reduce((s, x) => s + x.count, 0).toLocaleString('ar-EG')}
              </span>
            </div>
          </div>
        )}

        {/* Specializations table — multi-grade specs */}
        {!isSimpleGrades && !isSimpleSpecs && specs.length > 0 && (
          <>
            {/* Column headers */}
            <div style={{
              display: 'grid', gridTemplateColumns: gridCols,
              padding: '10px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', gap: 6,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>التخصص</div>
              {([g1L, g2L, g3L ?? '', ...(hasFourGrades ? [g4L ?? ''] : []), 'الإجمالي'] as string[]).map((l, i) => {
                const maxGradeIdx = hasFourGrades ? 4 : 3
                return (
                  <div key={i} style={{
                    fontSize: 10, fontWeight: 800, textAlign: 'center',
                    color: i < maxGradeIdx ? gradeColors[i] : '#0f172a',
                    background: i < maxGradeIdx ? `${gradeColors[i]}10` : '#f1f5f9',
                    borderRadius: 6, padding: '4px 6px',
                  }}>{l}</div>
                )
              })}
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {specs.map((s, i) => {
                const rowTotal = s.g1 + s.g2 + s.g3 + (s.g4 ?? 0)
                const fillPct = maxRow > 0 ? (rowTotal / maxRow) * 100 : 0
                const cells = hasFourGrades
                  ? [{ v: s.g1, c: gradeColors[0] }, { v: s.g2, c: gradeColors[1] }, { v: s.g3, c: gradeColors[2] }, { v: s.g4 ?? 0, c: gradeColors[3] }, { v: rowTotal, c: '#0f172a' }]
                  : [{ v: s.g1, c: gradeColors[0] }, { v: s.g2, c: gradeColors[1] }, { v: s.g3, c: gradeColors[2] }, { v: rowTotal, c: '#0f172a' }]
                const lastIdx = cells.length - 1
                return (
                  <div key={i} style={{
                    position: 'relative', overflow: 'hidden',
                    padding: '11px 20px', borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.12s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafbff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      position: 'absolute', top: 0, right: 0, bottom: 0,
                      width: `${fillPct}%`,
                      background: `${data.color}06`,
                      borderRight: `2px solid ${data.color}18`,
                      pointerEvents: 'none',
                    }} />
                    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: gridCols, gap: 6, alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: data.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{s.name}</span>
                      </div>
                      {cells.map((x, j) => (
                        <div key={j} style={{
                          textAlign: 'center', fontSize: j === lastIdx ? 13 : 12,
                          fontWeight: j === lastIdx ? 900 : 700, color: x.c,
                          background: j === lastIdx ? `${data.color}12` : `${x.c}0d`,
                          borderRadius: 7, padding: '5px 4px',
                          border: j === lastIdx ? `1px solid ${data.color}20` : 'none',
                        }}>{x.v.toLocaleString('ar-EG')}</div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer totals */}
            <div style={{
              display: 'grid', gridTemplateColumns: gridCols, gap: 6,
              padding: '14px 20px', background: `${data.color}08`, borderTop: `2px solid ${data.color}22`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: data.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>∑</span> الإجمالي الكلي
              </div>
              {(hasFourGrades
                ? [{ v: g1Total, c: gradeColors[0] }, { v: g2Total, c: gradeColors[1] }, { v: g3Total, c: gradeColors[2] }, { v: g4Total, c: gradeColors[3] }, { v: grandTotal, c: data.color }]
                : [{ v: g1Total, c: gradeColors[0] }, { v: g2Total, c: gradeColors[1] }, { v: g3Total, c: gradeColors[2] }, { v: grandTotal, c: data.color }]
              ).map((x, j, arr) => (
                <div key={j} style={{
                  textAlign: 'center', fontSize: j === arr.length - 1 ? 15 : 14,
                  fontWeight: 900, color: x.c,
                  background: j === arr.length - 1 ? `${data.color}18` : `${x.c}12`,
                  borderRadius: 7, padding: '5px 6px',
                }}>{x.v.toLocaleString('ar-EG')}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const totalHospitalStaff = hospitals.reduce((s, h) => s + h.staff, 0)
const totalAdminStaff = administrations.reduce((s, a) => s + a.staff, 0)
const totalDirectorateStaff = totalHospitalStaff + totalAdminStaff
const totalBeds = hospitals.reduce((s, h) => s + h.beds, 0)

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, icon, color, light, large }: {
  label: string; value: number | string; unit?: string
  icon: string; color: string; light: string; large?: boolean
}) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14,
      padding: large ? '20px 22px' : '16px 18px',
      borderTop: `3px solid ${color}`,
      transition: 'box-shadow 0.2s, transform 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{
          width: large ? 48 : 40, height: large ? 48 : 40, borderRadius: 10,
          background: light, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: large ? 22 : 18,
        }}>{icon}</div>
      </div>
      <div style={{ fontSize: large ? 30 : 24, fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: 5 }}>
        {typeof value === 'number' ? value.toLocaleString('ar-EG') : value}
        {unit && <span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8', marginRight: 6 }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

function SectionHeader({ title, subtitle, color = '#0c4a6e', color2 = '#0369a1' }: {
  title: string; subtitle: string; color?: string; color2?: string
}) {
  return (
    <div style={{
      padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      background: `linear-gradient(135deg, ${color} 0%, ${color2} 100%)`,
    }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{title}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{subtitle}</div>
    </div>
  )
}

// ─── Workforce Donut Grid ─────────────────────────────────────────────────────
function WorkforceChart({ field, onSelect }: { field: 'directorate' | 'administration' | 'hospital'; onSelect?: (label: string, total: number) => void }) {
  const total = workforce.reduce((s, w) => s + w[field], 0)
  return (
    <div style={{ padding: '16px 12px', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {workforce.map(w => {
        const val = w[field]
        const pct = total > 0 ? val / total : 0
        const r = 26, circ = 2 * Math.PI * r
        const dash = circ * pct
        const hasSpec = !!workforceSpecializations[w.label]
        return (
          <div key={w.label}
            onClick={() => hasSpec && onSelect?.(w.label, val)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 6, padding: '12px 6px', borderRadius: 12,
              background: '#f8fafc', border: '1.5px solid #f1f5f9',
              cursor: hasSpec && onSelect ? 'pointer' : 'default',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (hasSpec && onSelect) { e.currentTarget.style.background = `${w.color}0f`; e.currentTarget.style.borderColor = `${w.color}40` } }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#f1f5f9' }}
          >
            {/* Donut */}
            <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
              <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={32} cy={32} r={r} fill="none" stroke={`${w.color}1a`} strokeWidth={8} />
                <circle cx={32} cy={32} r={r} fill="none" stroke={w.color} strokeWidth={8}
                  strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                {w.icon}
              </div>
            </div>
            {/* Count */}
            <div style={{ fontSize: 16, fontWeight: 900, color: w.color, lineHeight: 1 }}>{val.toLocaleString('ar-EG')}</div>
            {/* Percent */}
            <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: w.color, borderRadius: 10, padding: '1px 7px' }}>
              {(pct * 100).toFixed(1)}%
            </div>
            {/* Label */}
            <div style={{ fontSize: 9.5, color: '#64748b', textAlign: 'center', lineHeight: 1.4, fontWeight: 600 }}>{w.label}</div>
            {hasSpec && onSelect && <div style={{ fontSize: 8, color: w.color, opacity: 0.7, marginTop: -2 }}>اضغط للتفاصيل ▼</div>}
          </div>
        )
      })}
    </div>
  )
}

// ─── Workforce Cards Panel ────────────────────────────────────────────────────
function WorkforceSection({ field, onSelect }: { field: 'directorate' | 'administration' | 'hospital'; onSelect?: (label: string, total: number) => void }) {
  const total = workforce.reduce((s, w) => s + w[field], 0)
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <SectionHeader
        title="القوى البشرية"
        subtitle={`إجمالي ${total.toLocaleString('ar-EG')} كادر وظيفي · اضغط لعرض التخصصات`}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#f1f5f9', flex: 1 }}>
        {workforce.map(w => {
          const hasSpec = !!workforceSpecializations[w.label]
          return (
            <div key={w.label}
              onClick={() => hasSpec && onSelect?.(w.label, w[field])}
              style={{
                background: '#fff', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                cursor: hasSpec && onSelect ? 'pointer' : 'default',
                transition: 'background 0.15s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (hasSpec && onSelect) e.currentTarget.style.background = '#f0f9ff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: w.color + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0,
              }}>{w.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>{w.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: w.color, lineHeight: 1 }}>
                  {w[field].toLocaleString('ar-EG')}
                </div>
              </div>
              {hasSpec && onSelect && (
                <span style={{ fontSize: 10, color: w.color, opacity: 0.7 }}>▼</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Directorate Page ─────────────────────────────────────────────────────────
function DirectoratePage() {
  const { hosps: hospitals, admins: administrations, wf: workforce } = useAppData()
  const totalHospitalStaff = hospitals.reduce((s, h) => s + h.staff, 0)
  const totalAdminStaff = administrations.reduce((s, a) => s + a.staff, 0)
  const totalDirectorateStaff = totalHospitalStaff + totalAdminStaff
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Director Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)',
        borderRadius: 14, padding: '16px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(3,105,161,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, backdropFilter: 'blur(8px)' }}>⚕️</div>
          <div>
            <div style={{ fontSize: 10, color: '#7dd3fc', fontWeight: 600, marginBottom: 3, letterSpacing: 0.5 }}>مدير مديرية الشؤون الصحية — كفرالشيخ</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{directorateManager}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { val: hospitals.length, label: 'مستشفى', icon: '🏥' },
            { val: administrations.length, label: 'إدارة صحية', icon: '🏢' },
            { val: totalDirectorateStaff.toLocaleString('ar-EG'), label: 'كادر وظيفي', icon: '👥' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 9, color: '#bae6fd', marginBottom: 3 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 1 – KPI Cards Row 1 */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0369a1', borderRadius: 2, display: 'inline-block' }} />
          المؤشرات الرئيسية للمديرية
        </div>
        {/* Row 1: 3 main */}
        <div className="grid-3" style={{ marginBottom: 12 }}>
          <StatCard large label="إجمالي الكوادر البشرية" value={totalDirectorateStaff} unit="موظف" icon="👥" color="#0369a1" light="#e0f2fe" />
          <StatCard large label="الإدارات الصحية" value={administrations.length} unit="إدارة" icon="🏢" color="#7c3aed" light="#ede9fe" />
          <StatCard large label="المستشفيات" value={hospitals.length} unit="مستشفى" icon="🏥" color="#0d9488" light="#ccfbf1" />
        </div>
        {/* Row 2: 7 medical capacity indicators */}
        <div className="grid-7">
          <StatCard label="الأسرة الداخلية"        value={1840} unit="سرير"  icon="🛏️" color="#d97706" light="#fef3c7" />
          <StatCard label="غرف العمليات"            value={87}   unit="غرفة"  icon="🏥" color="#0369a1" light="#e0f2fe" />
          <StatCard label="أسرة العناية المركزة"   value={312}  unit="سرير"  icon="❤️‍🔥" color="#dc2626" light="#fee2e2" />
          <StatCard label="أسرة الاستقبال"         value={524}  unit="سرير"  icon="🚪" color="#16a34a" light="#dcfce7" />
          <StatCard label="ماكينات الغسيل الكلوي" value={143}  unit="ماكينة" icon="🫀" color="#0d9488" light="#ccfbf1" />
          <StatCard label="أجهزة التنفس"           value={218}  unit="جهاز"  icon="🫁" color="#ea580c" light="#ffedd5" />
          <StatCard label="حضانات الأطفال"         value={96}   unit="حضانة" icon="🍼" color="#ec4899" light="#fce7f3" />
        </div>
      </div>

      {/* Section 2 – Workforce + Chart */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} />
          توزيع القوى البشرية
        </div>
        <div className="grid-2col-eq">
          <WorkforceSection field="directorate" onSelect={(l, t) => setModal({ label: l, total: t })} />

          {/* Chart */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            <SectionHeader
              title="مخطط القوى البشرية"
              subtitle="مقارنة الكوادر عبر التخصصات"
              color="#6d28d9"
              color2="#7c3aed"
            />
            <WorkforceChart field="directorate" onSelect={(l, t) => setModal({ label: l, total: t })} />
          </div>
        </div>
      </div>

      {/* Section 3 – Hospitals + Administrations */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0d9488', borderRadius: 2, display: 'inline-block' }} />
          المستشفيات والإدارات الصحية التابعة
        </div>
        <div className="grid-2col-eq">

          {/* Hospitals */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            <SectionHeader
              title={`المستشفيات التابعة للمديرية (${hospitals.length})`}
              subtitle={`إجمالي القوى البشرية: ${totalHospitalStaff.toLocaleString('ar-EG')} موظف`}
              color="#0c4a6e"
              color2="#0369a1"
            />
            {/* Type summary */}
            <div className="grid-hosp-type" style={{ borderBottom: '1px solid #f1f5f9' }}>
              {[
                { type: 'عام', count: 2 },
                { type: 'نموذجي', count: 2 },
                { type: 'مركزي', count: 6 },
                { type: 'نوعي', count: 8 },
              ].map((t, i) => {
                const tc = typeColors[t.type]
                return (
                  <div key={t.type} style={{
                    padding: '10px 14px', textAlign: 'center',
                    borderLeft: i < 3 ? '1px solid #f1f5f9' : 'none',
                    background: tc.bg,
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: tc.text }}>{t.count}</div>
                    <div style={{ fontSize: 10, color: tc.text, fontWeight: 600, marginTop: 1 }}>{t.type}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ maxHeight: 380, overflowY: 'auto' }}>
              {hospitals.map((h, i) => {
                const tc = typeColors[h.type]
                return (
                  <div key={h.name} style={{
                    padding: '11px 18px',
                    borderBottom: i < hospitals.length - 1 ? '1px solid #f8fafc' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>🏥</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{h.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>مدير: {h.manager}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#0369a1' }}>{h.staff.toLocaleString('ar-EG')}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>كادر</div>
                      </div>
                      <span style={{
                        padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                        background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
                      }}>{h.type}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Administrations */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            <SectionHeader
              title={`الإدارات الصحية (${administrations.length})`}
              subtitle={`إجمالي القوى البشرية: ${totalAdminStaff.toLocaleString('ar-EG')} موظف`}
              color="#5b21b6"
              color2="#7c3aed"
            />
            {/* Total banner */}
            <div style={{ padding: '10px 18px', background: '#faf5ff', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 24 }}>
              <div style={{ fontSize: 11, color: '#6d28d9' }}>
                <span style={{ fontWeight: 800 }}>{administrations.reduce((s, a) => s + a.units, 0)}</span> وحدة صحية إجمالاً
              </div>
              <div style={{ fontSize: 11, color: '#6d28d9' }}>
                <span style={{ fontWeight: 800 }}>{totalAdminStaff.toLocaleString('ar-EG')}</span> موظف إجمالاً
              </div>
            </div>
            <div style={{ maxHeight: 430, overflowY: 'auto' }}>
              {administrations.map((a, i) => {
                const maxStaff = Math.max(...administrations.map(x => x.staff))
                const pct = (a.staff / maxStaff) * 100
                return (
                  <div key={a.name} style={{
                    padding: '13px 18px',
                    borderBottom: i < administrations.length - 1 ? '1px solid #f8fafc' : 'none',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 7,
                          background: '#ede9fe', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: 13,
                        }}>🏢</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>إدارة {a.name} الصحية</div>
                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>مدير: {a.manager}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{a.staff.toLocaleString('ar-EG')}</div>
                          <div style={{ fontSize: 9, color: '#94a3b8' }}>موظف</div>
                        </div>
                        <div style={{
                          background: '#e0f2fe', borderRadius: 6, padding: '3px 8px',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#0369a1' }}>{a.units}</div>
                          <div style={{ fontSize: 9, color: '#0369a1' }}>وحدة</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                        width: `${pct}%`, transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
    </div>
  )
}

// ─── Unit Workforce Modal ─────────────────────────────────────────────────────
function UnitWorkforceModal({
  unit, adminStaff, onClose,
}: {
  unit: { name: string; type: string; staff: number; active: boolean }
  adminStaff: number
  onClose: () => void
}) {
  const scale = adminStaff > 0 ? unit.staff / adminStaff : 0
  const [specModal, setSpecModal] = useState<{ label: string; total: number } | null>(null)

  const unitWorkforce = workforce.map(w => ({
    ...w,
    count: Math.max(1, Math.round(w.administration * scale)),
  }))
  const totalUnitStaff = unitWorkforce.reduce((s, w) => s + w.count, 0)

  const doctorBreakdowns = [
    { name: 'جراحة عامة', count: 0 }, { name: 'نساء وتوليد', count: 0 },
    { name: 'باطنة', count: 0 }, { name: 'أطفال', count: 0 },
    { name: 'عيون', count: 0 }, { name: 'أسنان', count: 0 },
  ].map((s, i) => {
    const docTotal = unitWorkforce.find(w => w.label === 'أطباء بشري')?.count ?? 0
    const shares = [22, 18, 16, 14, 12, 10]
    const rest = 100 - shares.reduce((a, b) => a + b, 0)
    const pct = i < shares.length ? shares[i] : rest
    return { name: s.name, count: Math.max(1, Math.round(docTotal * pct / 100)) }
  })

  const techBreakdowns = [
    { name: 'فني معمل', share: 22 }, { name: 'فني أشعة', share: 18 },
    { name: 'فني تخدير', share: 16 }, { name: 'فني أسنان', share: 14 },
    { name: 'فني طوارئ', share: 14 }, { name: 'فني صيانة', share: 16 },
  ].map(s => {
    const techTotal = unitWorkforce.find(w => w.label === 'فنيون')?.count ?? 0
    return { name: s.name, count: Math.max(1, Math.round(techTotal * s.share / 100)) }
  })

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 860,
        maxHeight: '92vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)', overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
          padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏥</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>{unit.name}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#ddd6fe', background: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: 20 }}>{unit.type}</span>
                <span style={{ fontSize: 11, color: unit.active ? '#86efac' : '#fde68a' }}>● {unit.active ? 'نشط' : 'تحت الصيانة'}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
            {[
              { label: 'إجمالي الكوادر', val: totalUnitStaff, icon: '👥' },
              { label: 'أطباء وفنيون', val: (unitWorkforce.find(w=>w.label==='أطباء بشري')?.count??0)+(unitWorkforce.find(w=>w.label==='فنيون')?.count??0), icon: '⚕️' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: 9, color: '#ddd6fe', marginBottom: 3 }}>{s.icon} {s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{s.val.toLocaleString('ar-EG')}</div>
              </div>
            ))}
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, color: '#fff',
          }}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Workforce Grid */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 14, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} />
              توزيع الكوادر البشرية
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {unitWorkforce.map(w => {
                const hasSpec = !!workforceSpecializations[w.label]
                return (
                  <div key={w.label}
                    onClick={() => hasSpec && setSpecModal({ label: w.label, total: w.count })}
                    style={{
                      background: `${w.color}08`, border: `1.5px solid ${w.color}20`,
                      borderRadius: 12, padding: '14px 12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      cursor: hasSpec ? 'pointer' : 'default', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (hasSpec) { e.currentTarget.style.background = `${w.color}14`; e.currentTarget.style.borderColor = `${w.color}45` } }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${w.color}08`; e.currentTarget.style.borderColor = `${w.color}20` }}
                  >
                    <div style={{ fontSize: 22 }}>{w.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: w.color, lineHeight: 1 }}>{w.count.toLocaleString('ar-EG')}</div>
                    <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', fontWeight: 600 }}>{w.label}</div>
                    {hasSpec && <div style={{ fontSize: 9, color: w.color, opacity: 0.7 }}>اضغط للتفاصيل ▼</div>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Doctors Detail */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 14, background: '#0369a1', borderRadius: 2, display: 'inline-block' }} />
              تفاصيل الأطباء البشريين حسب التخصص
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', background: '#f1f5f9', padding: '9px 16px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>التخصص</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', textAlign: 'center' }}>العدد</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textAlign: 'center' }}>النسبة</div>
              </div>
              {doctorBreakdowns.map((d, i) => {
                const docTotal = unitWorkforce.find(w => w.label === 'أطباء بشري')?.count ?? 1
                const pct = Math.round((d.count / docTotal) * 100)
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 90px 90px',
                    padding: '10px 16px', borderBottom: i < doctorBreakdowns.length - 1 ? '1px solid #f1f5f9' : 'none',
                    alignItems: 'center',
                    background: i % 2 === 0 ? '#fff' : '#fafbff',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 2, background: '#0369a1', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{d.name}</span>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#0369a1', background: '#e0f2fe', borderRadius: 7, padding: '3px 6px' }}>
                      {d.count}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 40, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#0369a1', borderRadius: 3, width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Technicians Detail */}
          <div style={{ padding: '18px 22px 22px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 14, background: '#ea580c', borderRadius: 2, display: 'inline-block' }} />
              تفاصيل الفنيين حسب التخصص
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px', background: '#f1f5f9', padding: '9px 16px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>التخصص</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#ea580c', textAlign: 'center' }}>العدد</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textAlign: 'center' }}>النسبة</div>
              </div>
              {techBreakdowns.map((t, i) => {
                const techTotal = unitWorkforce.find(w => w.label === 'فنيون')?.count ?? 1
                const pct = Math.round((t.count / techTotal) * 100)
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 90px 90px',
                    padding: '10px 16px', borderBottom: i < techBreakdowns.length - 1 ? '1px solid #f1f5f9' : 'none',
                    alignItems: 'center',
                    background: i % 2 === 0 ? '#fff' : '#fafbff',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 2, background: '#ea580c', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{t.name}</span>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#ea580c', background: '#ffedd5', borderRadius: 7, padding: '3px 6px' }}>
                      {t.count}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 40, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#ea580c', borderRadius: 3, width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {specModal && <WorkforceModal category={specModal.label} total={specModal.total} onClose={() => setSpecModal(null)} />}
    </div>
  )
}

// ─── Administration Page ──────────────────────────────────────────────────────
function AdministrationPage({ initialIdx }: { initialIdx?: number } = {}) {
  const { admins: administrations, wf: workforce } = useAppData()
  const [selected, setSelected] = useState(initialIdx ?? 0)
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<{ name: string; type: string; staff: number; active: boolean } | null>(null)
  const [activeTab, setActiveTab] = useState<'workforce' | 'units'>('workforce')
  const admin = administrations[selected] ?? administrations[0]
  const subUnits = Array.from({ length: admin.units }, (_, i) => ({
    name: `مركز صحي ${['الحي الأول', 'الحي الثاني', 'الضاحية', 'الروضة', 'النزهة', 'المنطقة الصناعية', 'الأمل', 'الريف', 'الجديدة', 'الشرقية', 'الغربية', 'الشمالية', 'الجنوبية', 'المركزي', 'الوادي', 'الساحل', 'الهضبة', 'السهل'][i] || `رقم ${i + 1}`}`,
    type: i % 3 === 0 ? 'وحدة صحية' : i % 3 === 1 ? 'مركز صحي' : 'عيادة',
    staff: Math.floor(admin.staff / admin.units * (0.8 + Math.random() * 0.4)),
    active: i !== 4,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Admin Selector */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 10 }}>اختر الإدارة الصحية</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {administrations.map((a, i) => (
            <button key={a.name} onClick={() => setSelected(i)} style={{
              padding: '7px 14px', borderRadius: 8, border: '1.5px solid',
              borderColor: selected === i ? '#7c3aed' : '#e2e8f0',
              background: selected === i ? '#ede9fe' : '#f8fafc',
              color: selected === i ? '#7c3aed' : '#475569',
              fontSize: 12, fontWeight: selected === i ? 700 : 500,
              cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
            }}>إدارة {a.name}</button>
          ))}
        </div>
      </div>

      {/* Admin Manager Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
        borderRadius: 12, padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏢</div>
        <div>
          <div style={{ fontSize: 10, color: '#ddd6fe', fontWeight: 600, marginBottom: 2 }}>مدير إدارة {admin.name} الصحية</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>{admin.manager}</div>
        </div>
      </div>

      {/* KPIs Row 1 */}
      {(() => {
        const devUnits = Math.round(admin.units * 0.3)
        const accUnits = Math.round(admin.units * 0.25)
        const totalUnits = admin.units + devUnits + accUnits
        return (
          <>
            <div className="grid-5" style={{ marginBottom: 12 }}>
              <StatCard large label={`إجمالي الكوادر – إدارة ${admin.name}`} value={admin.staff} unit="موظف" icon="👥" color="#7c3aed" light="#ede9fe" />
              <StatCard large label="إجمالي الوحدات" value={totalUnits} unit="وحدة" icon="📊" color="#0c4a6e" light="#e0f2fe" />
              <StatCard large label="الوحدات الصحية" value={admin.units} unit="وحدة" icon="🏥" color="#0369a1" light="#dbeafe" />
              <StatCard large label="وحدات التطوير" value={devUnits} unit="وحدة" icon="📈" color="#0d9488" light="#ccfbf1" />
              <StatCard large label="وحدات الاعتماد" value={accUnits} unit="وحدة" icon="🏅" color="#d97706" light="#fef3c7" />
            </div>
            {/* KPIs Row 2 */}
            <div className="grid-4">
              <StatCard label="مكاتب الصحة" value={Math.round(admin.units * 0.6)} unit="مكتب" icon="🏢" color="#16a34a" light="#dcfce7" />
              <StatCard label="مكاتب التطعيمات" value={Math.round(admin.units * 0.55)} unit="مكتب" icon="💉" color="#dc2626" light="#fee2e2" />
              <StatCard label="عيادات الأسنان" value={Math.round(admin.units * 0.4)} unit="عيادة" icon="🦷" color="#6d28d9" light="#f5f3ff" />
              <StatCard label="عيادات العلاج الطبيعي" value={Math.round(admin.units * 0.35)} unit="عيادة" icon="🏃" color="#ea580c" light="#ffedd5" />
            </div>
          </>
        )
      })()}

      {/* Tabbed section: Workforce / Units */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {[
            { id: 'workforce' as const, label: '👥 القوى البشرية' },
            { id: 'units' as const, label: '🏥 الوحدات الصحية' },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '13px 22px', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700,
              background: activeTab === t.id ? '#fff' : 'transparent',
              color: activeTab === t.id ? '#7c3aed' : '#64748b',
              borderBottom: activeTab === t.id ? '2px solid #7c3aed' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>

        {activeTab === 'workforce' && (
          <div style={{ padding: 20 }}>
            <WorkforceSection field="administration" onSelect={(l, t) => setModal({ label: l, total: t })} />
          </div>
        )}

        {activeTab === 'units' && (
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {subUnits.map((u, i) => (
              <div key={i} style={{
                padding: '11px 18px',
                borderBottom: i < subUnits.length - 1 ? '1px solid #f8fafc' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background 0.15s', cursor: 'pointer',
              }}
                onClick={() => setSelectedUnit(u)}
                onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: u.active ? '#16a34a' : '#f59e0b', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{u.name}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{u.type} · {u.active ? 'نشط' : 'تحت الصيانة'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#f5f3ff', borderRadius: 7, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: '#7c3aed' }}>
                    {u.staff} موظف
                  </div>
                  <span style={{ fontSize: 11, color: '#7c3aed', opacity: 0.6 }}>▶</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
      {selectedUnit && <UnitWorkforceModal unit={selectedUnit} adminStaff={admin.staff} onClose={() => setSelectedUnit(null)} />}
    </div>
  )
}

// ─── Hospital Page ────────────────────────────────────────────────────────────
// Reference unit totals across the full directorate (18 hospitals combined)
const directorateUnits = [
  { label: 'الأسرة الداخلية',       icon: '🛏️', dirTotal: 1840, unit: 'سرير',   color: '#0369a1', light: '#e0f2fe',  occBase: 78 },
  { label: 'غرف العمليات',           icon: '🏥', dirTotal: 87,   unit: 'غرفة',   color: '#d97706', light: '#fef3c7',  occBase: 68 },
  { label: 'أسرة العناية المركزة',   icon: '❤️‍🔥', dirTotal: 312, unit: 'سرير',   color: '#dc2626', light: '#fee2e2',  occBase: 88 },
  { label: 'أسرة الاستقبال',         icon: '🚪', dirTotal: 524,  unit: 'سرير',   color: '#16a34a', light: '#dcfce7',  occBase: 62 },
  { label: 'ماكينات الغسيل الكلوي', icon: '🫀', dirTotal: 143,  unit: 'ماكينة', color: '#0d9488', light: '#ccfbf1',  occBase: 84 },
  { label: 'أجهزة التنفس',           icon: '🫁', dirTotal: 218,  unit: 'جهاز',   color: '#ea580c', light: '#ffedd5',  occBase: 52 },
  { label: 'حضانات الأطفال',         icon: '🍼', dirTotal: 96,   unit: 'حضانة',  color: '#ec4899', light: '#fce7f3',  occBase: 60 },
]

const totalHospBeds = hospitals.reduce((s, h) => s + h.beds, 0)
const totalWfHospital = workforce.reduce((s, w) => s + w.hospital, 0) || 1

function HospitalPage({ initialIdx }: { initialIdx?: number } = {}) {
  const { hosps: hospitals, wf: workforce } = useAppData()
  const totalHospBeds = hospitals.reduce((s, h) => s + h.beds, 0)
  const totalWfHospital = workforce.reduce((s, w) => s + w.hospital, 0) || 1
  const [selectedIdx, setSelectedIdx] = useState(initialIdx ?? 0)
  const [activeTab, setActiveTab] = useState<'units' | 'occupancy'>('units')
  const [modal, setModal] = useState<{ label: string; total: number } | null>(null)
  const hospital = hospitals[selectedIdx] ?? hospitals[0]

  // Scale unit capacities proportionally to this hospital's bed count
  const bedsScale = hospital.beds / (totalHospBeds || 1)
  const hospUnits = directorateUnits.map((u, i) => ({
    ...u,
    value: Math.max(1, Math.round(u.dirTotal * bedsScale)),
    occ: Math.min(97, Math.max(35, u.occBase + ((selectedIdx * 7 + i * 11) % 17) - 8)),
  }))

  // Scale workforce to match this hospital's actual staff count
  const wfScale = hospital.staff / totalWfHospital
  const hospWorkforce = workforce.map(w => ({
    ...w,
    scaled: Math.max(1, Math.round(w.hospital * wfScale)),
  }))
  const hospWfMax = Math.max(...hospWorkforce.map(w => w.scaled))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hospital Selector */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 10 }}>اختر المستشفى</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {hospitals.map((h, i) => {
            const tc = typeColors[h.type]
            return (
              <button key={h.name} onClick={() => setSelectedIdx(i)} style={{
                padding: '6px 12px', borderRadius: 8,
                border: `1.5px solid ${selectedIdx === i ? tc.text : '#e2e8f0'}`,
                background: selectedIdx === i ? tc.bg : '#f8fafc',
                color: selectedIdx === i ? tc.text : '#475569',
                fontSize: 11, fontWeight: selectedIdx === i ? 700 : 500,
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
              }}>
                {h.name.replace(/^مستشفى\s*/, '')}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hospital Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0284c7)',
        borderRadius: 14, padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🏥</div>
          <div>
            <div style={{ fontSize: 11, color: '#bae6fd', marginBottom: 3 }}>المستشفى المحدد</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: '#fff' }}>{hospital.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
              <span style={{
                padding: '2px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.15)', color: '#e0f2fe', fontSize: 11, fontWeight: 600,
              }}>مستشفى {hospital.type}</span>
              <span style={{ fontSize: 11, color: '#bae6fd' }}>·</span>
              <span style={{ fontSize: 11, color: '#bae6fd', fontWeight: 600 }}>مدير: <span style={{ color: '#fff' }}>{hospital.manager}</span></span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'القوى البشرية', val: hospital.staff, icon: '👥' },
            { label: 'الأسرة', val: hospital.beds, icon: '🛏️' },
            { label: 'الأقسام', val: 8, icon: '🏥' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 20px' }}>
              <div style={{ fontSize: 10, color: '#bae6fd', marginBottom: 4 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{s.val.toLocaleString('ar-EG')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid-4">
        {hospUnits.map(u => (
          <StatCard key={u.label} label={u.label} value={u.value} unit={u.unit} icon={u.icon} color={u.color} light={u.light} />
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {[{ id: 'units' as const, label: '👥 القوى البشرية' }, { id: 'occupancy' as const, label: '📊 نسب الإشغال' }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '13px 24px', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 700,
              background: activeTab === t.id ? '#fff' : 'transparent',
              color: activeTab === t.id ? '#0369a1' : '#64748b',
              borderBottom: activeTab === t.id ? '2px solid #0369a1' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>
        {activeTab === 'units' && (
          <div className="grid-wf" style={{ padding: 20 }}>
            {hospWorkforce.map(w => {
              const hasSpec = !!workforceSpecializations[w.label]
              return (
                <div key={w.label}
                  onClick={() => hasSpec && setModal({ label: w.label, total: w.scaled })}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', background: '#f8fafc', borderRadius: 10, border: '1px solid #f1f5f9',
                    cursor: hasSpec ? 'pointer' : 'default', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (hasSpec) e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc' }}
                >
                  <span style={{ fontSize: 20 }}>{w.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', marginBottom: 5 }}>{w.label}</div>
                    <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: w.color, width: `${(w.scaled / hospWfMax) * 100}%` }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 800, color: w.color, minWidth: 36, textAlign: 'center' }}>{w.scaled}</span>
                  {hasSpec && <span style={{ fontSize: 10, color: w.color, opacity: 0.6 }}>▼</span>}
                </div>
              )
            })}
          </div>
        )}
        {activeTab === 'occupancy' && (
          <div className="grid-4" style={{ padding: 20 }}>
            {hospUnits.map(u => {
              const pct = u.occ
              const color = pct > 85 ? '#dc2626' : pct > 65 ? '#d97706' : '#16a34a'
              return (
                <div key={u.label} style={{ padding: '16px', background: '#f8fafc', borderRadius: 12, textAlign: 'center', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{u.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{u.label}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{u.value.toLocaleString('ar-EG')}</span> {u.unit}
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)`, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color }}>{pct}%</div>
                  </div>
                  <div style={{ fontSize: 10, color: color, fontWeight: 700 }}>
                    {pct > 85 ? 'إشغال عالٍ' : pct > 65 ? 'إشغال متوسط' : 'إشغال منخفض'}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {modal && <WorkforceModal category={modal.label} total={modal.total} onClose={() => setModal(null)} />}
    </div>
  )
}

// ─── Shared UI Helpers ────────────────────────────────────────────────────────
function FormField({ label, value, onChange, type = 'number', readOnly }: {
  label: string; value: string | number; onChange?: (v: string) => void
  type?: string; readOnly?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>{label}</label>
      <input
        type={type} value={value} readOnly={readOnly}
        onChange={e => onChange?.(e.target.value)}
        style={{
          padding: '8px 12px', border: `1.5px solid ${readOnly ? '#e2e8f0' : '#cbd5e1'}`,
          borderRadius: 8, fontSize: 13, fontFamily: 'Cairo, sans-serif',
          color: '#1e293b', background: readOnly ? '#f8fafc' : '#fff',
          outline: 'none', direction: 'rtl', width: '100%',
        }}
        onFocus={e => { if (!readOnly) e.target.style.borderColor = '#0369a1' }}
        onBlur={e => { if (!readOnly) e.target.style.borderColor = '#cbd5e1' }}
      />
    </div>
  )
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button onClick={onClick} disabled={saving} style={{
      padding: '10px 28px', background: saving ? '#7dd3fc' : 'linear-gradient(135deg,#0369a1,#0ea5e9)',
      border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 700,
      fontFamily: 'Cairo, sans-serif', cursor: saving ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 14px rgba(3,105,161,0.3)',
    }}>
      {saving ? '⏳ جارٍ الحفظ...' : '💾 حفظ التغييرات'}
    </button>
  )
}

function EntryHeader({ title, subtitle, icon, color = '#0369a1' }: {
  title: string; subtitle: string; icon: string; color?: string
}) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}e8 0%, ${color} 100%)`,
      borderRadius: 14, padding: '18px 24px',
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: `0 4px 20px ${color}30`,
    }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>{subtitle}</div>
      </div>
    </div>
  )
}

// ─── Workforce Detail Section (shared) ────────────────────────────────────────
type WfDetail = { specs?: SpecRow[]; simple?: number[] }

function initWfDetail(scale: number): Record<string, WfDetail> {
  const result: Record<string, WfDetail> = {}
  for (const [label, data] of Object.entries(workforceSpecializations)) {
    if (data.simpleGrades) {
      result[label] = { simple: data.simpleGrades.map(v => Math.max(1, Math.round(v * scale))) }
    } else if (data.specs) {
      result[label] = {
        specs: data.specs.map(s => ({
          name: s.name,
          g1: Math.max(0, Math.round(s.g1 * scale)),
          g2: Math.max(0, Math.round(s.g2 * scale)),
          g3: Math.max(0, Math.round(s.g3 * scale)),
        }))
      }
    }
  }
  return result
}

function categoryTotal(label: string, detail: WfDetail | undefined, fallback: number): number {
  if (!detail) return fallback
  if (detail.simple) return detail.simple.reduce((s, v) => s + v, 0)
  if (detail.specs) return detail.specs.reduce((s, r) => s + r.g1 + r.g2 + r.g3, 0)
  return fallback
}

function WorkforceDetailSection({
  wf, detail, setDetail, accentColor,
}: {
  wf: WfItem[]
  detail: Record<string, WfDetail>
  setDetail: (fn: (p: Record<string, WfDetail>) => Record<string, WfDetail>) => void
  accentColor: string
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const gradeColors = ['#0369a1', '#0d9488', '#7c3aed']
  const total = wf.reduce((s, w) => s + categoryTotal(w.label, detail[w.label], 0), 0)

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', background: `linear-gradient(135deg,${accentColor}dd,${accentColor})`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>توزيع القوى البشرية بالتفصيل</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', background: 'rgba(255,255,255,0.2)', padding: '4px 14px', borderRadius: 20 }}>
          الإجمالي: {total.toLocaleString('ar-EG')}
        </div>
      </div>

      {wf.map(w => {
        const d = detail[w.label]
        const spec = workforceSpecializations[w.label]
        const catTotal = categoryTotal(w.label, d, 0)
        const isOpen = !!expanded[w.label]
        const [g1L, g2L, g3L] = spec ? (spec.gradeLabels as [string, string, string?]) : ['—', '—', '—']

        return (
          <div key={w.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
            {/* Category header row */}
            <div
              onClick={() => setExpanded(p => ({ ...p, [w.label]: !p[w.label] }))}
              style={{ padding: '13px 20px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: isOpen ? `${w.color}06` : 'transparent', transition: 'background 0.15s' }}
              onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#f8fafc' }}
              onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 9, background: `${w.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{w.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{w.label}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                  {spec ? (spec.specs ? `${spec.specs.length} تخصص` : 'درجتان وظيفيتان') : 'إجمالي فقط'}
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: w.color, minWidth: 60, textAlign: 'center' }}>
                {catTotal.toLocaleString('ar-EG')}
              </div>
              <div style={{ fontSize: 18, color: w.color, opacity: 0.7, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</div>
            </div>

            {/* Expanded detail */}
            {isOpen && (
              <div style={{ background: '#fafbff', borderTop: `1px solid ${w.color}15`, padding: '0 0 14px' }}>
                {/* Simple (تمريض) */}
                {d?.simple && spec?.simpleGrades && (
                  <div style={{ padding: '14px 20px', display: 'flex', gap: 16, justifyContent: 'center' }}>
                    {d.simple.map((v, i) => (
                      <div key={i} style={{ background: '#fff', border: `1.5px solid ${i === 0 ? w.color : '#0d9488'}22`, borderRadius: 12, padding: '14px 20px', textAlign: 'center', minWidth: 160 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>{spec.gradeLabels[i]}</div>
                        <input type="number" value={v}
                          onChange={e => setDetail(p => {
                            const nd = { ...(p[w.label] ?? {}), simple: (p[w.label]?.simple ?? []).map((x, j) => j === i ? Number(e.target.value) : x) }
                            return { ...p, [w.label]: nd }
                          })}
                          style={{ width: 100, padding: '8px 10px', border: `2px solid ${i === 0 ? w.color : '#0d9488'}33`, borderRadius: 9, fontSize: 22, fontWeight: 900, color: i === 0 ? w.color : '#0d9488', fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#f8fafc' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Specialties table */}
                {d?.specs && spec?.specs && (
                  <div style={{ margin: '4px 16px 0' }}>
                    {/* Column headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 90px) 90px', gap: 6, padding: '8px 12px', background: '#f1f5f9', borderRadius: '8px 8px 0 0', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b' }}>التخصص</div>
                      {[g1L, g2L, g3L ?? '', 'الإجمالي'].map((l, ci) => (
                        <div key={ci} style={{ fontSize: 10, fontWeight: 800, textAlign: 'center', color: ci < 3 ? gradeColors[ci] : '#0f172a', background: ci < 3 ? `${gradeColors[ci]}12` : '#e2e8f0', borderRadius: 5, padding: '3px 4px' }}>{l}</div>
                      ))}
                    </div>
                    {/* Rows */}
                    {d.specs.map((row, ri) => {
                      const rowTotal = row.g1 + row.g2 + row.g3
                      return (
                        <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 90px) 90px', gap: 6, padding: '7px 12px', background: ri % 2 === 0 ? '#fff' : '#fafbff', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 6, height: 6, borderRadius: 2, background: w.color, flexShrink: 0 }} />
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{row.name}</span>
                          </div>
                          {(['g1', 'g2', 'g3'] as const).map((gk, gi) => (
                            <input key={gk} type="number" value={row[gk]}
                              onChange={e => setDetail(p => {
                                const specs = (p[w.label]?.specs ?? []).map((r, rj) => rj === ri ? { ...r, [gk]: Number(e.target.value) } : r)
                                return { ...p, [w.label]: { ...p[w.label], specs } }
                              })}
                              style={{ width: '100%', padding: '5px 6px', border: `1.5px solid ${gradeColors[gi]}25`, borderRadius: 7, fontSize: 13, fontWeight: 700, color: gradeColors[gi], fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#fff' }}
                            />
                          ))}
                          <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 900, color: w.color, background: `${w.color}10`, borderRadius: 7, padding: '5px 6px' }}>{rowTotal.toLocaleString('ar-EG')}</div>
                        </div>
                      )
                    })}
                    {/* Footer totals */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 90px) 90px', gap: 6, padding: '8px 12px', background: `${w.color}08`, borderTop: `2px solid ${w.color}22`, borderRadius: '0 0 8px 8px' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: w.color }}>∑ الإجمالي</div>
                      {['g1', 'g2', 'g3'].map((gk, gi) => {
                        const colSum = d.specs!.reduce((s, r) => s + r[gk as 'g1' | 'g2' | 'g3'], 0)
                        return <div key={gk} style={{ textAlign: 'center', fontSize: 13, fontWeight: 900, color: gradeColors[gi], background: `${gradeColors[gi]}12`, borderRadius: 7, padding: '5px 6px' }}>{colSum.toLocaleString('ar-EG')}</div>
                      })}
                      <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 900, color: w.color, background: `${w.color}18`, borderRadius: 7, padding: '5px 6px', border: `1px solid ${w.color}25` }}>{catTotal.toLocaleString('ar-EG')}</div>
                    </div>
                  </div>
                )}

                {/* No specialization data */}
                {!spec && (
                  <div style={{ padding: '12px 20px' }}>
                    <input type="number" value={catTotal}
                      onChange={e => setDetail(p => ({ ...p, [w.label]: { simple: [Number(e.target.value)] } }))}
                      style={{ padding: '8px 14px', border: `1.5px solid ${w.color}30`, borderRadius: 8, fontSize: 18, fontWeight: 800, color: w.color, fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', width: 120 }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Hospital Data Entry ──────────────────────────────────────────────────────
function HospitalDataEntry({ hospIdx, isSuperAdmin }: { hospIdx: number; isSuperAdmin?: boolean }) {
  const { hosps, updateHosp, wf, logChange } = useAppData()
  const h = hosps[hospIdx]
  const totalHospBeds = hosps.reduce((s, x) => s + x.beds, 0) || 1
  const totalWfH = wf.reduce((s, w) => s + w.hospital, 0) || 1
  const wfScale = h.staff / totalWfH
  const bedsScale = h.beds / totalHospBeds

  const [hospUnits, setHospUnits] = useState(() =>
    directorateUnits.map((u, i) => {
      const total = Math.max(1, Math.round(u.dirTotal * bedsScale))
      const occPct = Math.min(97, Math.max(35, u.occBase + ((hospIdx * 7 + i * 11) % 17) - 8))
      const occupied = Math.round(total * occPct / 100)
      return { ...u, total, occupied }
    })
  )

  const [form, setForm] = useState({ staff: h.staff, beds: h.beds })
  const [detail, setDetail] = useState<Record<string, WfDetail>>(() => initWfDetail(wfScale))
  const [unitCaps, setUnitCaps] = useState<Record<string, number>>(() =>
    Object.fromEntries(directorateUnits.map(u => [u.label, Math.max(1, Math.round(u.dirTotal * bedsScale))]))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const wfTotal = wf.reduce((s, w) => s + categoryTotal(w.label, detail[w.label], 0), 0)
  const diff = form.staff - wfTotal

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      updateHosp(hospIdx, { staff: Number(form.staff), beds: Number(form.beds) })
      logChange(h.name, `تحديث بيانات ${h.name}: ${form.staff} كادر`)
      setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
    }, 700)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <EntryHeader title={h.name} subtitle={`مستشفى ${h.type} · إدخال وتعديل البيانات`} icon="🏥" color="#0369a1" />

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 18px', color: '#16a34a', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ تم حفظ البيانات بنجاح وتحديث الإجمالي العام
        </div>
      )}

      {/* Basic Info */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0369a1', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#0369a1', borderRadius: 2, display: 'inline-block' }} /> بيانات المستشفى الأساسية
        </div>
        <div className="form-grid-2" style={{ gap: 14 }}>
          <FormField label="المدير" value={h.manager} readOnly type="text" />
          <FormField label="إجمالي القوى البشرية" value={form.staff} onChange={v => setForm(p => ({ ...p, staff: Number(v) }))} />
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: diff === 0 ? '#16a34a' : '#dc2626', fontWeight: 700, padding: '10px 14px', background: diff === 0 ? '#f0fdf4' : '#fef2f2', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {diff === 0 ? '✅ إجمالي التوزيع التفصيلي متطابق مع الكادر الإجمالي' : diff > 0 ? `⚠ يتبقى ${diff} موظف لم يُوزَّع على التخصصات` : `⚠ التوزيع يتجاوز الإجمالي بـ ${Math.abs(diff)} موظف`}
          <strong style={{ marginRight: 'auto' }}>{wfTotal.toLocaleString('ar-EG')} / {form.staff.toLocaleString('ar-EG')}</strong>
        </div>
      </div>

      {/* Clinical Units */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#d97706', borderRadius: 2, display: 'inline-block' }} /> الطاقة السريرية والوحدات
        </div>
        <div className="form-grid-4" style={{ gap: 14 }}>
          {directorateUnits.map(u => (
            <div key={u.label} style={{ background: `${u.color}08`, border: `1.5px solid ${u.color}22`, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{u.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#374151', lineHeight: 1.3 }}>{u.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="number" value={unitCaps[u.label] ?? 0}
                  onChange={e => setUnitCaps(p => ({ ...p, [u.label]: Number(e.target.value) }))}
                  style={{ flex: 1, padding: '7px 8px', border: `1.5px solid ${u.color}30`, borderRadius: 7, fontSize: 17, fontWeight: 900, color: u.color, fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#fff' }}
                />
                <span style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{u.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Occupancy Rates — editable with total/occupied/available */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>📊 نسب الإشغال</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#bae6fd' }}>
            <span>🔵 الإجمالي</span><span>🔴 المشغول</span><span>🟢 المتاح</span>
          </div>
        </div>
        <div className="form-grid-4" style={{ padding: 20 }}>
          {hospUnits.map((u, i) => {
            const safeTotal = Number.isFinite(u.total) ? u.total : 0
            const safeOccupied = Number.isFinite(u.occupied) ? Math.min(u.occupied, safeTotal) : 0
            const available = Math.max(0, safeTotal - safeOccupied)
            const pct = safeTotal > 0 ? Math.round((safeOccupied / safeTotal) * 100) : 0
            const color = pct > 85 ? '#dc2626' : pct > 65 ? '#d97706' : '#16a34a'
            return (
              <div key={u.label} style={{ background: '#f8fafc', borderRadius: 14, border: `1.5px solid ${color}25`, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{u.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b', lineHeight: 1.3 }}>{u.label}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{u.unit}</div>
                  </div>
                  {/* Pct badge */}
                  <div style={{ marginRight: 'auto', textAlign: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color }}>{pct}%</div>
                    </div>
                  </div>
                </div>

                {/* Three fields */}
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Total */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0369a1', minWidth: 50 }}>الإجمالي</span>
                    <input
                      type="number" min={0} value={safeTotal}
                      onChange={e => {
                        const total = Math.max(0, Number(e.target.value) || 0)
                        setHospUnits(p => p.map((x, j) => j === i ? { ...x, total, occupied: Math.min(x.occupied ?? 0, total) } : x))
                      }}
                      style={{ flex: 1, padding: '5px 8px', border: '1.5px solid #bae6fd', borderRadius: 7, fontSize: 14, fontWeight: 800, color: '#0369a1', fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#eff6ff' }}
                      onFocus={e => (e.target.style.borderColor = '#0369a1')}
                      onBlur={e => (e.target.style.borderColor = '#bae6fd')}
                    />
                  </div>
                  {/* Occupied */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color, minWidth: 50 }}>المشغول</span>
                    <input
                      type="number" min={0} max={safeTotal} value={safeOccupied}
                      onChange={e => {
                        const occupied = Math.min(safeTotal, Math.max(0, Number(e.target.value) || 0))
                        setHospUnits(p => p.map((x, j) => j === i ? { ...x, occupied } : x))
                      }}
                      style={{ flex: 1, padding: '5px 8px', border: `1.5px solid ${color}55`, borderRadius: 7, fontSize: 14, fontWeight: 800, color, fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center', background: '#fff' }}
                      onFocus={e => (e.target.style.borderColor = color)}
                      onBlur={e => (e.target.style.borderColor = `${color}55`)}
                    />
                  </div>
                  {/* Available — read-only */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', minWidth: 50 }}>المتاح</span>
                    <div style={{ flex: 1, padding: '5px 8px', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 7, fontSize: 14, fontWeight: 900, color: '#16a34a', textAlign: 'center' }}>
                      {available.toLocaleString('ar-EG')}
                    </div>
                  </div>
                </div>

                {/* Bar */}
                <div style={{ margin: '0 14px 12px', height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: color, width: `${pct}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detailed Workforce */}
      <WorkforceDetailSection wf={wf} detail={detail} setDetail={setDetail} accentColor="#7c3aed" />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={handleSave} saving={saving} />
      </div>
    </div>
  )
}

// ─── Administration Data Entry ────────────────────────────────────────────────
const unitNames = ['الحي الأول','الحي الثاني','الضاحية','الروضة','النزهة','المنطقة الصناعية','الأمل','الريف','الجديدة','الشرقية','الغربية','الشمالية','الجنوبية','المركزي','الوادي','الساحل','الهضبة','السهل']

function AdminDataEntry({ adminIdx, isSuperAdmin }: { adminIdx: number; isSuperAdmin?: boolean }) {
  const { admins, updateAdmin, wf, logChange } = useAppData()
  const a = admins[adminIdx]
  const totalWfAdmin = wf.reduce((s, w) => s + w.administration, 0) || 1
  const wfScale = a.staff / totalWfAdmin
  const [form, setForm] = useState({ staff: a.staff, units: a.units })
  const [detail, setDetail] = useState<Record<string, WfDetail>>(() => initWfDetail(wfScale))
  const [subUnits, setSubUnits] = useState(() =>
    Array.from({ length: a.units }, (_, i) => ({
      name: `مركز صحي ${unitNames[i] ?? `رقم ${i + 1}`}`,
      type: i % 3 === 0 ? 'وحدة صحية' : i % 3 === 1 ? 'مركز صحي' : 'عيادة',
      staff: Math.round(a.staff / a.units),
      active: i !== 4,
    }))
  )
  const [newUnit, setNewUnit] = useState({ name: '', type: 'مركز صحي', staff: 0, active: true })
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      updateAdmin(adminIdx, { staff: Number(form.staff), units: subUnits.length })
      logChange(`إدارة ${a.name}`, `تحديث بيانات إدارة ${a.name}: ${form.staff} كادر، ${subUnits.length} وحدة`)
      setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
    }, 700)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <EntryHeader title={`إدارة ${a.name} الصحية`} subtitle="إدخال وتعديل بيانات الإدارة والوحدات الصحية" icon="🏢" color="#7c3aed" />

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 18px', color: '#16a34a', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ تم حفظ بيانات الإدارة وتحديث الإجمالي العام
        </div>
      )}

      {/* Basic stats */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#7c3aed', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 16, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} /> بيانات الإدارة
        </div>
        <div className="form-grid-3" style={{ gap: 14 }}>
          <FormField label="اسم الإدارة" value={a.name} readOnly type="text" />
          <FormField label="المدير" value={a.manager} readOnly type="text" />
          <FormField label="عدد الوحدات" value={subUnits.length} readOnly />
          <FormField label="إجمالي الكوادر" value={form.staff}
            onChange={v => setForm(p => ({ ...p, staff: Number(v) }))} />
        </div>
      </div>

      {/* Sub-units management */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#5b21b6,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>الوحدات الصحية ({subUnits.length})</div>
          {isSuperAdmin && (
            <button onClick={() => setShowAdd(!showAdd)} style={{
              padding: '6px 16px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
            }}>+ إضافة وحدة</button>
          )}
        </div>

        {isSuperAdmin && showAdd && (
          <div className="units-row-add" style={{ padding: '14px 20px', background: '#faf5ff', borderBottom: '1px solid #ede9fe' }}>
            <FormField label="اسم الوحدة" value={newUnit.name} type="text" onChange={v => setNewUnit(p => ({ ...p, name: v }))} />
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>النوع</label>
              <select value={newUnit.type} onChange={e => setNewUnit(p => ({ ...p, type: e.target.value }))} style={{ padding: '8px 12px', border: '1.5px solid #cbd5e1', borderRadius: 8, fontSize: 12, fontFamily: 'Cairo, sans-serif', width: '100%', outline: 'none' }}>
                {['وحدة صحية', 'مركز صحي', 'عيادة'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <FormField label="الكوادر" value={newUnit.staff} onChange={v => setNewUnit(p => ({ ...p, staff: Number(v) }))} />
            <button onClick={() => { if (newUnit.name) { setSubUnits(p => [...p, { ...newUnit }]); setNewUnit({ name: '', type: 'مركز صحي', staff: 0, active: true }); setShowAdd(false) } }}
              style={{ padding: '9px 18px', background: '#7c3aed', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', height: 38, alignSelf: 'end' }}>
              إضافة
            </button>
          </div>
        )}

        <div style={{ maxHeight: 340, overflowY: 'auto' }}>
          {subUnits.map((u, i) => (
            <div key={i} className="units-row" style={{ padding: '11px 20px', borderBottom: i < subUnits.length - 1 ? '1px solid #f8fafc' : 'none' }}>
              {isSuperAdmin ? (
                <input value={u.name} onChange={e => setSubUnits(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                  style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12, fontFamily: 'Cairo, sans-serif', outline: 'none' }} />
              ) : (
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{u.name}</div>
              )}
              <span style={{ fontSize: 11, color: '#64748b', background: '#f1f5f9', borderRadius: 6, padding: '4px 10px', textAlign: 'center' }}>{u.type}</span>
              {isSuperAdmin ? (
                <input type="number" value={u.staff} onChange={e => setSubUnits(p => p.map((x, j) => j === i ? { ...x, staff: Number(e.target.value) } : x))}
                  style={{ padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 13, fontWeight: 700, color: '#7c3aed', fontFamily: 'Cairo, sans-serif', outline: 'none', textAlign: 'center' }} />
              ) : (
                <div style={{ background: '#f5f3ff', borderRadius: 7, padding: '4px 10px', fontSize: 13, fontWeight: 700, color: '#7c3aed', textAlign: 'center' }}>{u.staff}</div>
              )}
              <button onClick={() => isSuperAdmin && setSubUnits(p => p.map((x, j) => j === i ? { ...x, active: !x.active } : x))}
                style={{ padding: '4px 12px', borderRadius: 20, border: 'none', cursor: isSuperAdmin ? 'pointer' : 'default', fontSize: 11, fontWeight: 700, fontFamily: 'Cairo, sans-serif', background: u.active ? '#dcfce7' : '#fef3c7', color: u.active ? '#16a34a' : '#d97706' }}>
                {u.active ? 'نشط' : 'معطّل'}
              </button>
              {isSuperAdmin ? (
                <button onClick={() => setSubUnits(p => p.filter((_, j) => j !== i))}
                  style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Workforce */}
      <WorkforceDetailSection wf={wf} detail={detail} setDetail={setDetail} accentColor="#7c3aed" />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SaveBtn onClick={handleSave} saving={saving} />
      </div>
    </div>
  )
}

// ─── Diwan Data Entry ─────────────────────────────────────────────────────────
function DiwanDataEntry() {
  const { diwanDepts, diwanWf, updateDiwanDept, addDiwanDept, removeDiwanDept, updateDiwanWfCount, logChange } = useAppData()
  const [depts, setDepts] = useState(() => diwanDepts.map(d => ({ ...d })))
  const [wfLocal, setWfLocal] = useState(() => diwanWf.map(w => ({ ...w })))
  const [newDept, setNewDept] = useState({ name: '', icon: '🏢', head: '', type: 'فنية' as 'فنية' | 'إدارية', staff: 0 })
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      depts.forEach((d, i) => updateDiwanDept(i, d))
      wfLocal.forEach((w, i) => updateDiwanWfCount(i, w.count))
      logChange('ديوان المديرية', `تحديث بيانات الديوان: ${depts.length} إدارة، ${depts.reduce((s, d) => s + d.staff, 0)} كادر`)
      setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
    }, 700)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <EntryHeader title="ديوان المديرية" subtitle="إدخال وتعديل بيانات الإدارات والكوادر" icon="🏤" color="#0d9488" />

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 18px', color: '#16a34a', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ تم حفظ بيانات الديوان بنجاح
        </div>
      )}

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
            <button onClick={() => { if (newDept.name) { const d = { ...newDept }; setDepts(p => [...p, d]); addDiwanDept(d); setNewDept({ name: '', icon: '🏢', head: '', type: 'فنية', staff: 0 }); setShowAdd(false) } }}
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
              <button onClick={() => { setDepts(p => p.filter((_, j) => j !== i)); removeDiwanDept(i) }}
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

// ─── SuperAdmin Panel ─────────────────────────────────────────────────────────
function SuperAdminPanel({ onViewDashboard }: { onViewDashboard: () => void }) {
  const { hosps, admins, diwanDepts, diwanWf, changeLog, updateHosp, updateAdmin, logChange } = useAppData()
  const [activeSection, setActiveSection] = useState<'overview' | 'hospitals' | 'admins' | 'diwan' | 'log'>('overview')
  const [editHospIdx, setEditHospIdx] = useState<number | null>(null)
  const [editAdminIdx, setEditAdminIdx] = useState<number | null>(null)

  const totalStaff = hosps.reduce((s, h) => s + h.staff, 0) + admins.reduce((s, a) => s + a.staff, 0)
  const totalBeds = hosps.reduce((s, h) => s + h.beds, 0)
  const totalUnits = admins.reduce((s, a) => s + a.units, 0)
  const diwanTotal = diwanWf.reduce((s, w) => s + w.count, 0)

  const sections = [
    { id: 'overview' as const, label: 'نظرة عامة', icon: '📊' },
    { id: 'hospitals' as const, label: `المستشفيات (${hosps.length})`, icon: '🏥' },
    { id: 'admins' as const, label: `الإدارات (${admins.length})`, icon: '🏢' },
    { id: 'diwan' as const, label: 'الديوان', icon: '🏤' },
    { id: 'log' as const, label: 'سجل التغييرات', icon: '📋' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0369a1, #0ea5e9)',
        borderRadius: 14, padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(3,105,161,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>⚕️</div>
          <div>
            <div style={{ fontSize: 11, color: '#7dd3fc', fontWeight: 600 }}>لوحة التحكم الرئيسية — صلاحيات كاملة</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: '#fff' }}>مديرية الشؤون الصحية — كفرالشيخ</div>
          </div>
        </div>
        <button onClick={onViewDashboard} style={{
          padding: '9px 20px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
        }}>📊 عرض الداشبورد الكامل</button>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => { setActiveSection(s.id); setEditHospIdx(null); setEditAdminIdx(null) }} style={{
            padding: '9px 18px', borderRadius: 10, border: '1.5px solid',
            borderColor: activeSection === s.id ? '#0369a1' : '#e2e8f0',
            background: activeSection === s.id ? '#e0f2fe' : '#f8fafc',
            color: activeSection === s.id ? '#0369a1' : '#475569',
            fontSize: 12, fontWeight: activeSection === s.id ? 700 : 500,
            cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
          }}>{s.icon} {s.label}</button>
        ))}
      </div>

      {/* Overview */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="grid-4">
            <StatCard large label="إجمالي الكوادر البشرية" value={totalStaff} unit="موظف" icon="👥" color="#0369a1" light="#e0f2fe" />
            <StatCard large label="المستشفيات" value={hosps.length} unit="مستشفى" icon="🏥" color="#0d9488" light="#ccfbf1" />
            <StatCard large label="الإدارات الصحية" value={admins.length} unit="إدارة" icon="🏢" color="#7c3aed" light="#ede9fe" />
            <StatCard large label="الأسرة الداخلية" value={totalBeds} unit="سرير" icon="🛏️" color="#d97706" light="#fef3c7" />
          </div>
          <div className="grid-3">
            <StatCard label="كوادر الديوان" value={diwanTotal} unit="موظف" icon="🏤" color="#dc2626" light="#fee2e2" />
            <StatCard label="الوحدات الصحية" value={totalUnits} unit="وحدة" icon="📍" color="#ea580c" light="#ffedd5" />
            <StatCard label="إجمالي الإدارات" value={admins.reduce((s, a) => s + a.staff, 0)} unit="موظف" icon="🏢" color="#6d28d9" light="#f5f3ff" />
          </div>
          {/* Quick access grid */}
          <div className="grid-2col-eq">
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', color: '#fff', fontSize: 13, fontWeight: 700 }}>🏥 المستشفيات — آخر الأرقام</div>
              <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                {hosps.map((h, i) => (
                  <div key={i} style={{ padding: '10px 18px', borderBottom: i < hosps.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                    onClick={() => { setActiveSection('hospitals'); setEditHospIdx(i) }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f9ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{h.name}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>مدير: {h.manager}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0369a1' }}>{h.staff.toLocaleString('ar-EG')}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8' }}>كادر · {h.beds} سرير</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: 'linear-gradient(135deg,#5b21b6,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 700 }}>🏢 الإدارات الصحية — آخر الأرقام</div>
              <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                {admins.map((a, i) => (
                  <div key={i} style={{ padding: '10px 18px', borderBottom: i < admins.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                    onClick={() => { setActiveSection('admins'); setEditAdminIdx(i) }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>إدارة {a.name}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{a.manager}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{a.staff.toLocaleString('ar-EG')}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8' }}>{a.units} وحدة</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hospitals Edit List */}
      {activeSection === 'hospitals' && (
        <div>
          {editHospIdx !== null ? (
            <div>
              <button onClick={() => setEditHospIdx(null)} style={{ marginBottom: 14, padding: '7px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', color: '#475569' }}>← رجوع للقائمة</button>
              <HospitalDataEntry hospIdx={editHospIdx} isSuperAdmin />
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', color: '#fff', fontSize: 14, fontWeight: 700 }}>🏥 المستشفيات ({hosps.length}) — اضغط لتعديل</div>
              {hosps.map((h, i) => {
                const tc = typeColors[h.type]
                return (
                  <div key={i} onClick={() => setEditHospIdx(i)} style={{ padding: '13px 20px', borderBottom: i < hosps.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f9ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>🏥</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{h.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{h.manager}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0369a1' }}>{h.staff.toLocaleString('ar-EG')}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>كادر</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0d9488' }}>{h.beds}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>سرير</div>
                      </div>
                      <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>{h.type}</span>
                      <span style={{ fontSize: 11, color: '#0369a1' }}>✏️</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Admins Edit List */}
      {activeSection === 'admins' && (
        <div>
          {editAdminIdx !== null ? (
            <div>
              <button onClick={() => setEditAdminIdx(null)} style={{ marginBottom: 14, padding: '7px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', color: '#475569' }}>← رجوع للقائمة</button>
              <AdminDataEntry adminIdx={editAdminIdx} isSuperAdmin />
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#5b21b6,#7c3aed)', color: '#fff', fontSize: 14, fontWeight: 700 }}>🏢 الإدارات الصحية ({admins.length}) — اضغط لتعديل</div>
              {admins.map((a, i) => (
                <div key={i} onClick={() => setEditAdminIdx(i)} style={{ padding: '13px 20px', borderBottom: i < admins.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#faf5ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>🏢</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>إدارة {a.name} الصحية</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{a.manager}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#7c3aed' }}>{a.staff.toLocaleString('ar-EG')}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8' }}>موظف</div>
                    </div>
                    <div style={{ background: '#e0f2fe', borderRadius: 6, padding: '3px 9px', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0369a1' }}>{a.units}</div>
                      <div style={{ fontSize: 9, color: '#0369a1' }}>وحدة</div>
                    </div>
                    <span style={{ fontSize: 11, color: '#7c3aed' }}>✏️</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Diwan */}
      {activeSection === 'diwan' && <DiwanDataEntry />}

      {/* Change Log */}
      {activeSection === 'log' && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg,#1e293b,#334155)', color: '#fff', fontSize: 14, fontWeight: 700 }}>📋 سجل التغييرات ({changeLog.length})</div>
          {changeLog.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>لا توجد تغييرات مسجلة بعد</div>
          ) : (
            <div style={{ maxHeight: 460, overflowY: 'auto' }}>
              {[...changeLog].reverse().map((l, i) => (
                <div key={i} style={{ padding: '11px 20px', borderBottom: i < changeLog.length - 1 ? '1px solid #f8fafc' : 'none', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0369a1', flexShrink: 0, marginTop: 5 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{l.msg}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                      {l.actor} · {new Date(l.ts).toLocaleString('ar-EG')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Data Entry Dashboard Shell ───────────────────────────────────────────────
function DataEntryDashboard({ user, onViewDashboard, onLogout }: {
  user: AuthUser
  onViewDashboard: () => void
  onLogout: () => void
}) {
  const role = user.role
  const isSuper = role.type === 'superadmin'
  const isHosp = role.type === 'hospital'
  const isAdmin = role.type === 'administration'
  const isDiwan = role.type === 'diwan'

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
        {isAdmin && <AdminDataEntry adminIdx={(role as { type: 'administration'; idx: number }).idx} />}
        {isHosp && <HospitalDataEntry hospIdx={(role as { type: 'hospital'; idx: number }).idx} />}
      </div>
    </div>
  )
}

// ─── Diwan-Only Shell ─────────────────────────────────────────────────────────
function DiwanOnlyShell({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
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

// ─── Main View Dashboard Shell ────────────────────────────────────────────────
const viewPages: { id: Page; label: string; icon: string; sub: string }[] = [
  { id: 'directorate',    label: 'مديرية الشؤون الصحية', icon: '🏛️', sub: 'نظرة عامة شاملة'      },
  { id: 'diwan',          label: 'ديوان المديرية',        icon: '🏤', sub: 'أقسام وكوادر الديوان'  },
  { id: 'administration', label: 'الإدارة الصحية',        icon: '🏢', sub: 'إدارة الوحدات'         },
  { id: 'hospital',       label: 'المستشفى',               icon: '🏥', sub: 'تفاصيل المستشفى'       },
]

function ViewDashboard({ user, onDataEntry, onLogout }: {
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

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  // ── Central mutable data state ──
  const [hosps, setHosps] = useState<Hospital[]>(() => hospitals.map(h => ({ ...h })))
  const [admins, setAdmins] = useState<Administration[]>(() => administrations.map(a => ({ ...a })))
  const [diwanDepts, setDiwanDepts] = useState<DiwanDept[]>(() => diwanDepartments.map(d => ({ ...d })))
  const [diwanWf, setDiwanWf] = useState<DiwanWfItem[]>(() => diwanWorkforce.map(w => ({ ...w })))
  const [wf, setWf] = useState<WfItem[]>(() => workforce.map(w => ({ ...w })))
  const [changeLog, setChangeLog] = useState<{ ts: number; actor: string; msg: string }[]>([])

  const updateHosp = useCallback((idx: number, patch: Partial<Hospital>) => {
    setHosps(p => p.map((h, i) => i === idx ? { ...h, ...patch } : h))
  }, [])
  const updateAdmin = useCallback((idx: number, patch: Partial<Administration>) => {
    setAdmins(p => p.map((a, i) => i === idx ? { ...a, ...patch } : a))
  }, [])
  const updateDiwanDept = useCallback((idx: number, patch: Partial<DiwanDept>) => {
    setDiwanDepts(p => p.map((d, i) => i === idx ? { ...d, ...patch } : d))
  }, [])
  const addDiwanDept = useCallback((dept: DiwanDept) => setDiwanDepts(p => [...p, dept]), [])
  const removeDiwanDept = useCallback((idx: number) => setDiwanDepts(p => p.filter((_, i) => i !== idx)), [])
  const updateDiwanWfCount = useCallback((idx: number, count: number) => {
    setDiwanWf(p => p.map((w, i) => i === idx ? { ...w, count } : w))
  }, [])
  const addHosp = useCallback((h: Hospital) => setHosps(p => [...p, h]), [])
  const removeHosp = useCallback((idx: number) => setHosps(p => p.filter((_, i) => i !== idx)), [])
  const addAdmin = useCallback((a: Administration) => setAdmins(p => [...p, a]), [])
  const removeAdmin = useCallback((idx: number) => setAdmins(p => p.filter((_, i) => i !== idx)), [])
  const logChange = useCallback((actor: string, msg: string) => {
    setChangeLog(p => [...p, { ts: Date.now(), actor, msg }])
  }, [])

  const ctxValue: AppDataCtxType = {
    hosps, admins, diwanDepts, diwanWf, wf,
    updateHosp, updateAdmin, updateDiwanDept, addDiwanDept, removeDiwanDept,
    updateDiwanWfCount, addHosp, removeHosp, addAdmin, removeAdmin,
    changeLog, logChange,
  }

  // ── Auth state ──
  const allUsers = buildAllUsers(hosps, admins)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [mode, setMode] = useState<'view' | 'entry'>('view')

  const logout = () => { setCurrentUser(null); setMode('view') }

  if (!currentUser) {
    return (
      <AppDataCtx.Provider value={ctxValue}>
        <LoginPage
          onLogin={u => { setCurrentUser(u); setMode(u.role.type === 'superadmin' ? 'view' : 'entry') }}
          allUsers={allUsers}
        />
      </AppDataCtx.Provider>
    )
  }

  return (
    <AppDataCtx.Provider value={ctxValue}>
      {currentUser.role.type === 'diwan' ? (
        <DiwanOnlyShell user={currentUser} onLogout={logout} />
      ) : currentUser.role.type === 'superadmin' && mode === 'view' ? (
        <ViewDashboard user={currentUser} onDataEntry={() => setMode('entry')} onLogout={logout} />
      ) : (
        <DataEntryDashboard user={currentUser} onViewDashboard={() => setMode('view')} onLogout={logout} />
      )}
    </AppDataCtx.Provider>
  )
}
