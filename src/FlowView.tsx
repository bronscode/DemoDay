import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, ReactFlowInstance, useKeyPress, useNodesState, useReactFlow, Node, Panel,
} from "@xyflow/react";
import React, { useEffect, useMemo } from "react";
import StandNode from './Nodes/StandNode.tsx';
import AgentNode from './Nodes/AgentNode.tsx';

type NodeObject = {id: string, data: {label: string}, position: {x: number, y: number }, type: string}

type KeyPressCallback = (flowInstance: ReactFlowInstance) => void;

export const getNewId = (nodes: Node[]) => {
	if (nodes.length === 0) return "1";
	else return `${Math.max(...nodes.map((node) => Number(node.id))) + 1}`;
};

export function useKeybind(keyCode: string | string[], onPress: KeyPressCallback) {
	const flowInstance = useReactFlow();

	const isPressed = useKeyPress(keyCode);

	useEffect(() => {
		if (isPressed && document.activeElement?.localName !== "input") {
			onPress(flowInstance);
		}
	}, [isPressed]);
}

const addStand: KeyPressCallback = (flow) => {
    const nodes = flow.getNodes();
    const id = getNewId(nodes)
    const newNode = { id: id, position: { x: 900, y: 100 }, data: { label: 'StandNode' },type: "standNode" };
    flow.setNodes((prev) => prev.concat(newNode))
}

const addAgent: KeyPressCallback = (flow) => {
    const nodes = flow.getNodes();
    const id = getNewId(nodes)
    const newNode = { id: id, position: { x: 900, y: 100 }, data: { label: 'AgentNode' },type: "agentNode" };
    flow.setNodes((prev) => prev.concat(newNode))
}

const addBox: KeyPressCallback = (flow) => {
    const nodes = flow.getNodes();
    const id = getNewId(nodes)
    const newNode = { id: id, position: { x: 900, y: 100 }, data: { label: 'BoxNode' },type: "agentNode" };
    flow.setNodes((prev) => prev.concat(newNode))
}

const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Venue Entrance' },type: "standNode" },
    { id: '2', position: { x: 300, y: 100 }, data: { label: '' },type: "agentNode" },
    { id: '3', position: { x: 500, y: 100 }, data: { label: '' },type: "agentNode" },
    { id: '4', position: { x: 700, y: 100 }, data: { label: '' },type: "agentNode" },
    { id: '5', position: { x: 900, y: 100 }, data: { label: '' },type: "agentNode" },
    { id: '6' ,position: { x: 1100, y: 100 }, data: { label: 'Bronscode' }, type: "standNode" },
  ];


export default function FlowView () {
    const nodeTypes = useMemo(() => ({ standNode: StandNode, agentNode: AgentNode }), []);
     
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    const step = (value: NodeObject) => {
        return {...value, position: {x: value.position.x + 30, y:  value.position.y + 30}}
    }

    useEffect(() => {
        const interval = setInterval(() => 
            setNodes((prev) => prev.map((node) => node.type === "agentNode" ? step(node) : node))
        , 1000)
        return () => clearInterval(interval);
    })

    useKeybind("q", addStand)
    useKeybind("w", addAgent)
    useKeybind("e", addBox)

    return <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            deleteKeyCode={"Delete"}
            onNodesChange={onNodesChange}>
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
        <Panel position="bottom-center"><button onClick={() => setNodes(initialNodes)}>Reset</button></Panel>
    </div>
}