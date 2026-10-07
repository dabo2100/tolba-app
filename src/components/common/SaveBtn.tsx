

export default function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
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
