import type { SpecRow, SpecData } from '../../domain/models'

export type WfDetail = { specs?: SpecRow[]; simple?: number[] }

export function initWfDetail(scale: number, workforceSpecializations: Record<string, SpecData>): Record<string, WfDetail> {
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

export function categoryTotal(detail: WfDetail | undefined, fallback: number): number {
  if (!detail) return fallback
  if (detail.simple) return detail.simple.reduce((s, v) => s + v, 0)
  if (detail.specs) return detail.specs.reduce((s, r) => s + r.g1 + r.g2 + r.g3, 0)
  return fallback
}
