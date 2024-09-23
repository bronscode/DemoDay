import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useNodesState, Node, Panel,
} from "@xyflow/react";
import React, { useEffect, useMemo } from "react";
import StandNode from './Nodes/StandNode.tsx';
import AgentNode from './Nodes/AgentNode.tsx';
import useKeybinds from "./useKeybinds.tsx";
import { step, isAgentNode } from "./model.ts";
import WallNode from "./Nodes/WallNode.tsx";

export const getNewId = (nodes: Node[]) => {
	if (nodes.length === 0) return "1";
	else return `${Math.max(...nodes.map((node) => Number(node.id))) + 1}`;
};

const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'EnginX', width: 100, heigth: 30 },type: "standNode",draggable: true },
    { id: '2', position: { x: 300, y: 100 }, data: { label: '' },type: "agentNode", draggable: false  },
    { id: '3', position: { x: 500, y: 100 }, data: { label: '' },type: "agentNode", draggable: false  },
    { id: '4', position: { x: 700, y: 100 }, data: { label: '' },type: "agentNode", draggable: false  },
    { id: '5', position: { x: 900, y: 100 }, data: { label: '' },type: "agentNode", draggable: false },
    { id: '6' ,position: { x: 1100, y: 100 }, data: { label: 'Bronscode', width: 100, heigth: 30 }, type: "standNode", draggable: true},
    { id: '7', position: { x: 900, y: 100 }, data: { label: '' },type: "agentNode", draggable: false },
    { id: '8', position: { x: 900, y: 100 }, data: { label: '' },type: "agentNode", draggable: false },
    { id: '9', position: { x: 900, y: 100 }, data: { label: '' },type: "agentNode", draggable: false },
    { id: '10', position: { x: 900, y: 100 }, data: { label: '' },type: "agentNode", draggable: false },
    { id: '11' ,position: { x: 0, y: 0 }, data: { label: '', width: 30, heigth: 100 }, type: "wallNode", draggable: true },
    { id: '12' ,position: { x: 1100, y: 0 }, data: { label: '', width: 30, heigth: 100 }, type: "wallNode",draggable: true },
  ];

const snapGrid: [number, number] = [64, 64];


export default function FlowView () {
    const nodeTypes = useMemo(() => ({ standNode: StandNode, agentNode: AgentNode, wallNode: WallNode }), []);
     
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    useEffect(() => {
        const interval = setInterval(() => {
            setNodes((prevNodes) => prevNodes.map((node) => isAgentNode(node) ? step(node, prevNodes) : node));
        }, 2000)
        return () => clearInterval(interval);
    })

    useKeybinds()

    return <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            deleteKeyCode={"Delete"}
            onNodesChange={onNodesChange}
            snapToGrid
			snapGrid={snapGrid}>
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={32} size={2} offset={2}/>
        </ReactFlow>
        <Panel position="bottom-center"><button onClick={() => setNodes(initialNodes)}>Reset</button></Panel>
    </div>
}