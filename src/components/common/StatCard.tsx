

export default function StatCard({ label, value, unit, icon, color, light, large }: {
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
