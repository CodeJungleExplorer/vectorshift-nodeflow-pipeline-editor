import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(s => ({ nodes: s.nodes, edges: s.edges }), shallow);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const d = await res.json();
      alert(`Pipeline Analysis\n─────────────────\nNodes : ${d.num_nodes}\nEdges : ${d.num_edges}\n\n${d.is_dag ? '✅ Valid DAG' : '⚠️ Cycle detected — not a DAG'}`);
    } catch (err) {
      alert(`Backend unreachable. Run:\ncd backend && uvicorn main:app --reload --port 8000\n\n${err.message}`);
    }
  };

  return (
    <div style={{
      flexShrink: 0, height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      <button
        onClick={handleSubmit}
        style={{
          background: 'var(--accent)', color: '#0d0f14', border: 'none',
          borderRadius: 8, padding: '10px 32px',
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.05em', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 2px 12px rgba(251,191,36,0.3)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='#f59e0b'; e.currentTarget.style.transform='translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='none'; }}
      >
        <span>▶</span><span>Analyze Pipeline</span>
      </button>
    </div>
  );
};