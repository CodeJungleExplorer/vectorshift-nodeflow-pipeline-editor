// nodes/llmNode.js

import { useState } from 'react';
import { BaseNode, FieldRow } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="✦"
      accentColor="#a78bfa"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
      minWidth={220}
    >
      <FieldRow label="Model">
        <select
          className="node-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
          <option value="claude-3-haiku">Claude 3 Haiku</option>
        </select>
      </FieldRow>
      <div
        style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.4,
        }}
      >
        Accepts system prompt + user prompt, returns completion.
      </div>
    </BaseNode>
  );
};
