// nodes/mergeNode.js — Merge/combine multiple inputs

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');
  const [separator, setSeparator] = useState(data?.separator || '\n');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="⊕"
      accentColor="#c084fc"
      inputs={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
        { id: 'c', label: 'c' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
      minWidth={220}
    >
      <FieldRow label="Strategy">
        <select
          className="node-select"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="json">JSON Array</option>
          <option value="template">Template</option>
        </select>
      </FieldRow>
      {strategy === 'concat' && (
        <FieldRow label="Separator">
          <input
            className="node-input"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            placeholder="\n"
          />
        </FieldRow>
      )}
    </BaseNode>
  );
};
