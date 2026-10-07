

export default function EntryHeader({ title, subtitle, icon, color = '#0369a1' }: {
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
