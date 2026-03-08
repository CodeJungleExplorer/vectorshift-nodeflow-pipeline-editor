import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  accentColor = '#fbbf24',
  icon = '◆',
  inputs = [],
  outputs = [],
  minWidth = 220,
  children,
  style = {},
}) => {
  const getTop = (list, index) => {
    if (list.length === 1) return '50%';
    const start = 25, end = 75;
    return `${start + ((end - start) / (list.length - 1)) * index}%`;
  };

  return (
    <div
      className="base-node-wrapper"
      style={{
        minWidth,
        background: 'var(--bg-node)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 'var(--radius-node)',
        boxShadow: 'var(--shadow-node)',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
        ...style,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '8px 14px',
        background: 'var(--bg-node-header)',
        borderBottom: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-node) var(--radius-node) 0 0',
      }}>
        <span style={{ fontSize: 11, color: accentColor }}>{icon}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
          color: 'var(--text-primary)', letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>{title}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>

      {/* Handles — plain, no labels, no wrapper divs, no children */}
      {inputs.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          style={{ top: getTop(inputs, i) }}
        />
      ))}
      {outputs.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          style={{ top: getTop(outputs, i) }}
        />
      ))}
    </div>
  );
};

export const FieldRow = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <label style={{
      fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
      textTransform: 'uppercase', letterSpacing: '0.06em',
    }}>{label}</label>
    {children}
  </div>
);