// nodes/transformNode.js — Data transformation node

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  const [custom, setCustom] = useState(data?.custom || '');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⇄"
      accentColor="#38bdf8"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
      minWidth={220}
    >
      <FieldRow label="Operation">
        <select
          className="node-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="custom">Custom (JS)</option>
        </select>
      </FieldRow>
      {operation === 'custom' && (
        <FieldRow label="Expression (x => ...)">
          <input
            className="node-input"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="x => x.replace(/\s+/g, '_')"
          />
        </FieldRow>
      )}
    </BaseNode>
  );
};
