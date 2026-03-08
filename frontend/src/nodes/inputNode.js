// nodes/inputNode.js

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="→"
      accentColor="#34d399"
      outputs={[{ id: 'value', label: 'value' }]}
      minWidth={220}
    >
      <FieldRow label="Name">
        <input
          className="node-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="input_name"
        />
      </FieldRow>
      <FieldRow label="Type">
        <select
          className="node-select"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </FieldRow>
    </BaseNode>
  );
};
