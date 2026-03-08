// draggableNode.js

export const DraggableNode = ({ type, label, color = '#fbbf24', icon = '◆' }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={onDragStart}
      onDragEnd={(e) => (e.target.style.opacity = '1')}
      draggable
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        background: 'var(--bg-tertiary)',
        border: `1px solid rgba(255,255,255,0.06)`,
        borderLeft: `2px solid ${color}`,
        borderRadius: 6,
        transition: 'background 0.15s, transform 0.1s',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-node-header)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
    >
      <span style={{ fontSize: 10, color }}>{icon}</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-secondary)',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
};
