import { useAppData } from '../../state/AppDataContext'
import SectionHeader from '../../components/common/SectionHeader'

export function WorkforceChart({ field, onSelect }: { field: 'directorate' | 'administration' | 'hospital'; onSelect?: (label: string, total: number) => void }) {
  const { wf: workforce, workforceSpecializations } = useAppData()
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
export function WorkforceSection({ field, onSelect }: { field: 'directorate' | 'administration' | 'hospital'; onSelect?: (label: string, total: number) => void }) {
  const { wf: workforce, workforceSpecializations } = useAppData()
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
