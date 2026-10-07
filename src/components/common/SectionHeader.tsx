

export default function SectionHeader({ title, subtitle, color = '#0c4a6e', color2 = '#0369a1' }: {
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
