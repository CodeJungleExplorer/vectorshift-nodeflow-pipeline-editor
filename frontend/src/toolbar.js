import { DraggableNode } from './draggableNode';

const NODES = [
  { type: 'customInput',  label: 'Input',       color: '#34d399', icon: '→' },
  { type: 'customOutput', label: 'Output',      color: '#f87171', icon: '←' },
  { type: 'llm',          label: 'LLM',         color: '#a78bfa', icon: '✦' },
  { type: 'text',         label: 'Text',        color: '#fbbf24', icon: 'T' },
  { type: 'transform',    label: 'Transform',   color: '#38bdf8', icon: '⇄' },
  { type: 'conditional',  label: 'Conditional', color: '#fb923c', icon: '⋔' },
  { type: 'api',          label: 'API Call',    color: '#60a5fa', icon: '⬡' },
  { type: 'merge',        label: 'Merge',       color: '#c084fc', icon: '⊕' },
  { type: 'note',         label: 'Note',        color: '#94a3b8', icon: '✎' },
];

export const PipelineToolbar = () => (
  <div style={{
    flexShrink: 0,
    height: 56,
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-subtle)',
    display: 'flex', alignItems: 'center',
    padding: '0 16px', gap: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 12, flexShrink: 0 }}>
      <div style={{
        width: 26, height: 26, background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
        borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color: '#0d0f14',
      }}>P</div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>
        Pipeline<span style={{ color: 'var(--accent)' }}>.</span>
      </span>
    </div>
    <div style={{ width: 1, height: 28, background: 'var(--border-subtle)', flexShrink: 0 }} />
    <div style={{ display: 'flex', gap: 6, overflow: 'auto' }}>
      {NODES.map(n => <DraggableNode key={n.type} {...n} />)}
    </div>
  </div>
);