import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  Node,
  Panel,
} from "@xyflow/react";
import React, { useEffect, useMemo } from "react";
import StandNode from "./Nodes/StandNode";
import AgentNode from "./Nodes/AgentNode";
import useKeybinds from "./useKeybinds";
import { step, isAgentNode } from "./model";
import WallNode from "./Nodes/WallNode";
import { randomVec } from "./vectors";

export const getNewId = (nodes: Node[]) => {
  if (nodes.length === 0) return "1";
  else return `${Math.max(...nodes.map((node) => Number(node.id))) + 1}`;
};

const initialNodes = [
  {
    id: "1",
    position: { x: 300, y: 100 },
    data: { label: "", dv: randomVec() },
    type: "agentNode",
    draggable: false,
  },
];

const snapGrid: [number, number] = [32, 32];

export default function FlowView() {
  const nodeTypes = useMemo(
    () => ({ standNode: StandNode, agentNode: AgentNode, wallNode: WallNode }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(
        (prevNodes) =>
          prevNodes
            .map((node) =>
              isAgentNode(node) ? step(node, prevNodes as any) : node
            )
            .filter((x) => x !== null) as any
      );
    }, 500);
    return () => clearInterval(interval);
  });

  useKeybinds();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        deleteKeyCode={"Delete"}
        onNodesChange={onNodesChange}
        snapToGrid
        snapGrid={snapGrid}
        translateExtent={[
          [-1000, -600],
          [1000, 600],
        ]}
        nodeExtent={[
          [-1000, -600],
          [1000, 600],
        ]}
        minZoom={1.5}
        maxZoom={4}
      >
        <Controls />
        <MiniMap nodeColor="#1282a2" maskColor="#66666688" />
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          offset={4}
        />
      </ReactFlow>
      <Panel position="bottom-center">
        <button onClick={() => setNodes(initialNodes)}>Reset</button>
      </Panel>
    </div>
  );
}
