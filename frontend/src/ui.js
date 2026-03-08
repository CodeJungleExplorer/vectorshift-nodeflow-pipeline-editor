import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }       from './nodes/inputNode';
import { OutputNode }      from './nodes/outputNode';
import { LLMNode }         from './nodes/llmNode';
import { TextNode }        from './nodes/textNode';
import { TransformNode }   from './nodes/transformNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { ApiNode }         from './nodes/apiNode';
import { MergeNode }       from './nodes/mergeNode';
import { NoteNode }        from './nodes/noteNode';
import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode, customOutput: OutputNode, llm: LLMNode,
  text: TextNode, transform: TransformNode, conditional: ConditionalNode,
  api: ApiNode, merge: MergeNode, note: NoteNode,
};

const proOptions = { hideAttribution: true };
const selector = (s) => ({
  nodes: s.nodes, edges: s.edges, getNodeID: s.getNodeID, addNode: s.addNode,
  onNodesChange: s.onNodesChange, onEdgesChange: s.onEdgesChange, onConnect: s.onConnect,
});

export const PipelineUI = () => {
  const wrapperRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const s = useStore(selector, shallow);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const bounds = wrapperRef.current.getBoundingClientRect();
    const raw = e.dataTransfer.getData('application/reactflow');
    if (!raw) return;
    const { nodeType: type } = JSON.parse(raw);
    if (!type) return;
    const position = rfInstance.project({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    const nodeId = s.getNodeID(type);
    s.addNode({ id: nodeId, type, position, data: { id: nodeId, nodeType: type } });
  }, [rfInstance, s]);

  const onDragOver = useCallback((e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }, []);

  return (
    <div ref={wrapperRef} style={{ flex: 1, minHeight: 0 }}>
      <ReactFlow
        nodes={s.nodes} edges={s.edges}
        onNodesChange={s.onNodesChange} onEdgesChange={s.onEdgesChange}
        onConnect={s.onConnect} onDrop={onDrop} onDragOver={onDragOver}
        onInit={setRfInstance} nodeTypes={nodeTypes} proOptions={proOptions}
        snapGrid={[20, 20]} connectionLineType="smoothstep"
        style={{ width: '100%', height: '100%' }}
      >
        <Background color="rgba(255,255,255,0.04)" gap={20} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(n) => ({ customInput:'#34d399',customOutput:'#f87171',llm:'#a78bfa',text:'#fbbf24',transform:'#38bdf8',conditional:'#fb923c',api:'#60a5fa',merge:'#c084fc',note:'#94a3b8' }[n.type]||'#4a5568')}
          maskColor="rgba(13,15,20,0.7)"
        />
      </ReactFlow>
    </div>
  );
};