import { ReactFlowInstance, useKeyPress, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { getNewId } from "./FlowView";
import { randomVec, scalarMult } from "./vectors";

type KeyPressCallback = (flowInstance: ReactFlowInstance) => void;

export function useKeybind(
  keyCode: string | string[],
  onPress: KeyPressCallback
) {
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
  const id = getNewId(nodes);
  const newNode = {
    id: id,
    position: scalarMult(randomVec(), 200),
    data: { label: "StandNode" },
    type: "standNode",
    zIndex: 5,
  };
  flow.setNodes((prev) => prev.concat(newNode));
};

const addAgent: KeyPressCallback = (flow) => {
  const nodes = flow.getNodes();
  let newNodes: any = [];
  for (let i = 0; i < 10; i++) {
    const id = getNewId(nodes.concat(newNodes));
    newNodes.push({
      id: id,
      position: scalarMult(randomVec(), 200),
      data: { label: `AgentNode ${id}`, dv: randomVec() },
      type: "agentNode",
      draggable: false,
      zIndex: 1,
    });
  }
  flow.setNodes((prev) => prev.concat(newNodes));
};

const addWall: KeyPressCallback = (flow) => {
  const nodes = flow.getNodes();
  const id = getNewId(nodes);
  const newNode = {
    id: id,
    position: scalarMult(randomVec(), 200),
    data: { label: "WallNode", width: 30, heigth: 100 },
    type: "wallNode",
    zIndex: 5,
  };
  flow.setNodes((prev) => prev.concat(newNode));
};

export default function useKeybinds() {
  useKeybind("q", addStand);
  useKeybind("w", addAgent);
  useKeybind("e", addWall);
}
