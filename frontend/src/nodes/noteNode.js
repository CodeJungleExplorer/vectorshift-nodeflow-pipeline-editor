// nodes/noteNode.js — Annotation / comment node

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="✎"
      accentColor="#94a3b8"
      inputs={[]}
      outputs={[]}
      minWidth={200}
      style={{ opacity: 0.85 }}
    >
      <textarea
        className="node-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        style={{
          background: 'rgba(251,191,36,0.04)',
          border: '1px dashed rgba(255,255,255,0.08)',
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: 'var(--text-secondary)',
          resize: 'vertical',
        }}
      />
    </BaseNode>
  );
};
