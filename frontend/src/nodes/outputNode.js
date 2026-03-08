// nodes/outputNode.js

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="←"
      accentColor="#f87171"
      inputs={[{ id: 'value', label: 'value' }]}
      minWidth={220}
    >
      <FieldRow label="Name">
        <input
          className="node-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="output_name"
        />
      </FieldRow>
      <FieldRow label="Type">
        <select
          className="node-select"
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </FieldRow>
    </BaseNode>
  );
};
