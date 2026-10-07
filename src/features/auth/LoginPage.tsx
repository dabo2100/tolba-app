import { useState } from 'react'
import type { AuthUser } from '../../domain/models'

export default function LoginPage({ onLogin, allUsers }: { onLogin: (u: AuthUser) => void; allUsers: AuthUser[] }) {
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
