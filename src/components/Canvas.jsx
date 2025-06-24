import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
} from 'react-flow-renderer';

const nodeTypes = {
  blockA: ({ data }) => (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        alert('Hello from A');
      }}
      style={{
        padding: 10,
        background: '#a0d2eb',
        borderRadius: 5,
        position: 'relative',
        width: 120,
        height: 60,
      }}
    >
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  ),
  blockB: ({ data }) => (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        alert('Hello from B');
      }}
      style={{
        padding: 10,
        background: '#f4a261',
        borderRadius: 5,
        position: 'relative',
        width: 120,
        height: 60,
      }}
    >
      {data.label}
      <Handle type="target" position={Position.Left} />
    </div>
  ),
};

let id = 0;
const getId = () => `node_${id++}`;

const CanvasInner = ({ undo, redo, state, setState }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, edges] = state;

  const updateState = (newNodes, newEdges) => setState([newNodes, newEdges]);

  const onNodesChange = useCallback(
    (changes) => {
      const updated = applyNodeChanges(changes, nodes);
      updateState(updated, edges);
    },
    [nodes, edges]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const updated = applyEdgeChanges(changes, edges);
      updateState(nodes, updated);
    },
    [nodes, edges]
  );

  const onConnect = useCallback(
    (params) => {
      updateState(nodes, addEdge(params, edges));
    },
    [nodes, edges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: type === 'blockA' ? 'Block A' : 'Block B' },
      };

      updateState([...nodes, newNode], edges);
    },
    [nodes, edges]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selectedNodeIds = nodes.filter((n) => n.selected).map((n) => n.id);
        const selectedEdgeIds = edges.filter((e) => e.selected).map((e) => e.id);

        const newNodes = nodes.filter((n) => !selectedNodeIds.includes(n.id));
        const newEdges = edges.filter((e) => !selectedEdgeIds.includes(e.id));

        updateState(newNodes, newEdges);
      }
      if (e.ctrlKey && e.key === 'z') undo();
      if (e.ctrlKey && e.key === 'y') redo();
    },
    [nodes, edges, undo, redo]
  );

  return (
    <div
      className="canvas"
      ref={reactFlowWrapper}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        panOnScroll
        connectionLineStyle={{ stroke: '#000', strokeWidth: 2 }}
        connectionLineType="bezier"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

const Canvas = ({ undo, redo }) => {
  const [state, setState] = React.useState([[], []]);

  return (
    <ReactFlowProvider>
      <CanvasInner undo={undo} redo={redo} state={state} setState={setState} />
    </ReactFlowProvider>
  );
};

export default Canvas;
