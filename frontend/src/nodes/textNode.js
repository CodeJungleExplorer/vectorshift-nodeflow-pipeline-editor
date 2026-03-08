import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, FieldRow } from './BaseNode';

const VAR_REGEX = /\{\{(\w+)\}\}/g;
const extractVariables = (text) => {
  const vars = [], seen = new Set();
  let m; VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null)
    if (!seen.has(m[1])) { seen.add(m[1]); vars.push(m[1]); }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const taRef = useRef(null);

  const autoResize = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.max(60, ta.scrollHeight)}px`;
  }, []);

  useEffect(() => { autoResize(); }, [text, autoResize]);

  const handleChange = (e) => {
    setText(e.target.value);
    setVariables(extractVariables(e.target.value));
  };

  const getTop = (list, i) => {
    if (list.length === 1) return '50%';
    return `${25 + (50 / (list.length - 1)) * i}%`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <BaseNode
        id={id} title="Text" icon="T" accentColor="#fbbf24"
        inputs={[]} outputs={[{ id: 'output' }]}
        minWidth={240}
      >
        <FieldRow label="Content">
          <textarea
            ref={taRef}
            className="node-textarea"
            value={text}
            onChange={handleChange}
            rows={3}
            style={{ minHeight: 60, transition: 'height 0.1s' }}
            placeholder="Type text or use {{variable}}"
          />
        </FieldRow>
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map(v => (
              <span key={v} style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                background: 'rgba(251,191,36,0.1)', color: 'var(--accent)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderRadius: 3, padding: '1px 5px',
              }}>{`{{${v}}}`}</span>
            ))}
          </div>
        )}
      </BaseNode>

      {/* Variable handles — plain, no children, no wrappers */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: getTop(variables, i) }}
        />
      ))}
    </div>
  );
};