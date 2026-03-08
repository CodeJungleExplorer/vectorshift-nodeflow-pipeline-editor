// nodes/apiNode.js — HTTP API call node

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const methodColors = { GET: '#34d399', POST: '#60a5fa', PUT: '#fbbf24', DELETE: '#f87171' };

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="⬡"
      accentColor="#60a5fa"
      inputs={[
        { id: 'body', label: 'body' },
        { id: 'headers', label: 'headers' },
      ]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
      minWidth={250}
    >
      <FieldRow label="Method">
        <select
          className="node-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ color: methodColors[method] || 'var(--text-primary)' }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </FieldRow>
      <FieldRow label="URL">
        <input
          className="node-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/..."
        />
      </FieldRow>
    </BaseNode>
  );
};
