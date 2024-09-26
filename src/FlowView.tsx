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
import WallNode from "./Nodes/WallNode";
import SpawnNode from "./Nodes/SpawnNode";
import initialNodes from "./initialNodes.json";
import { AGENT_AMOUNT, isAgentNode, step } from "./model";
import { randomVec, scalarMult } from "./vectors";

export const getNewId = () => {
  return `${Math.floor(Math.random() * 10000000) + 100}`;
};

const snapGrid: [number, number] = [32, 32];

function chooseRandomPointInSpawnArea(nodes) {
  const spawnAreas = nodes.filter(node => node.type === "spawnNode");
  const randomArea = spawnAreas[Math.floor(Math.random() * spawnAreas.length)];
  return {
    x: randomArea.position.x + (Math.random() * randomArea.measured.width),
    y: randomArea.position.y + (Math.random() * randomArea.measured.height),
  }
}

export default function FlowView() {
  const nodeTypes = useMemo(
    () => ({ standNode: StandNode, agentNode: AgentNode, wallNode: WallNode, spawnNode: SpawnNode }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any[]);

  useEffect(() => {
    const interval = setInterval(() => {

      //Step crowd model
      setNodes(
        (prevNodes) => 
          prevNodes
            .map((node) =>
              isAgentNode(node) ? step(node, prevNodes as any) : node
            )
            .filter((x) => x !== null) as any
      );

      // Spawn new agents
      if (nodes.filter(isAgentNode).length < AGENT_AMOUNT) {
        const id = getNewId();
        const position = chooseRandomPointInSpawnArea(nodes);

        setNodes(prevNodes => prevNodes.concat({
          id: id,
          position,
          data: { label: `AgentNode ${id}`, dv: randomVec() },
          type: "agentNode",
          draggable: false,
          zIndex: 1,
        }));
      }

    }, 500);
    return () => clearInterval(interval);
  });

  // console.log(nodes)
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
        <MiniMap nodeColor="#1282a2" maskColor="#66666688" pannable zoomable />
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
