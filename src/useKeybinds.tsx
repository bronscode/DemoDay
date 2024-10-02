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
  const id = getNewId();
  const newNode: any = {
    id: id,
    position: scalarMult(randomVec(), 200),
    data: { label: "StandNode" },
    type: "standNode",
    zIndex: 5,
  };
  flow.setNodes((prev) => prev.concat(newNode));
};

const addAgent: KeyPressCallback = (flow) => {
  let newNodes: any = [];
  for (let i = 0; i < 10; i++) {
    const id = getNewId();
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
  const id = getNewId();
  const newNode: any = {
    id: id,
    position: scalarMult(randomVec(), 200),
    data: { label: "WallNode", width: 30, heigth: 100 },
    type: "wallNode",
    zIndex: 5,
  };
  flow.setNodes((prev) => prev.concat(newNode));
};

const addSpawn: KeyPressCallback = (flow) => {
  const id = getNewId();
  const newNode: any = {
    id: id,
    position: scalarMult(randomVec(), 200),
    data: { label: "SpawnNode", width: 30, heigth: 100 },
    type: "spawnNode",
    zIndex: 0,
  };
  flow.setNodes((prev) => prev.concat(newNode));
};

export default function useKeybinds() {
  useKeybind("q", addStand);
  useKeybind("w", addAgent);
  useKeybind("e", addWall);
  useKeybind("r", addSpawn);
  return [addAgent, addStand, addWall]
}
