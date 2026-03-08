// nodes/conditionalNode.js — If/else branching node

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'contains');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="⋔"
      accentColor="#fb923c"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true', label: 'true' },
        { id: 'false', label: 'false' },
      ]}
      minWidth={230}
    >
      <FieldRow label="Operator">
        <select
          className="node-select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts with</option>
          <option value="endsWith">Ends with</option>
          <option value="isEmpty">Is empty</option>
        </select>
      </FieldRow>
      {operator !== 'isEmpty' && (
        <FieldRow label="Value">
          <input
            className="node-input"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="compare value..."
          />
        </FieldRow>
      )}
    </BaseNode>
  );
};
