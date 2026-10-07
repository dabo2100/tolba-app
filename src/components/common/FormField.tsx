

export default function FormField({ label, value, onChange, type = 'number', readOnly }: {
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
