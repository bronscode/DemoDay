import { ReactFlowInstance, useKeyPress, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { getNewId } from "./FlowView.tsx";

type KeyPressCallback = (flowInstance: ReactFlowInstance) => void;

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
    const newNode = { id: id, position: { x: 900, y: 100 }, data: { label: `AgentNode ${id}` },type: "agentNode", draggable: false  };
    flow.setNodes((prev) => prev.concat(newNode))
}

const addWall: KeyPressCallback = (flow) => {
    const nodes = flow.getNodes();
    const id = getNewId(nodes)
    const newNode = { id: id, position: { x: 900, y: 100 }, data: { label: 'WallNode', width: 30, heigth: 100  },type: "wallNode" };
    flow.setNodes((prev) => prev.concat(newNode))
}

export default function useKeybinds () {
    useKeybind("q", addStand)
    useKeybind("w", addAgent)
    useKeybind("e", addWall)
}