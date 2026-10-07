import { useAppData } from '../../state/AppDataContext'
import { gradeColors } from '../../data/reference'

export default function WorkforceModal({ category, total, onClose }: { category: string; total: number; onClose: () => void }) {
  const { wf: workforce, workforceSpecializations } = useAppData()
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
