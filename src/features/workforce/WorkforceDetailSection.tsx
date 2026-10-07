import { useState } from 'react'
import type { WfItem } from '../../domain/models'
import { useAppData } from '../../state/AppDataContext'
import { categoryTotal, type WfDetail } from './detailModel'

export default function WorkforceDetailSection({
  wf, detail, setDetail, accentColor,
}: {
  wf: WfItem[]
  detail: Record<string, WfDetail>
  setDetail: (fn: (p: Record<string, WfDetail>) => Record<string, WfDetail>) => void
  accentColor: string
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const { workforceSpecializations } = useAppData()
  const gradeColors = ['#0369a1', '#0d9488', '#7c3aed']
  const total = wf.reduce((s, w) => s + categoryTotal(detail[w.label], 0), 0)

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
        const catTotal = categoryTotal(d, 0)
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
