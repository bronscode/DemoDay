import { createNoise2D } from "simplex-noise";
import {
  add,
  addDir,
  distance,
  fromAngle,
  randomVec,
  scalarMult,
  subtract,
  Vector2D,
} from "./vectors";

export interface Agent {
  id: string;
  data: { label: string; dv: Vector2D, color: string };
  position: Vector2D;
  type: string;
  draggable: boolean;
}

export interface Stand {
  id: string;
  data: { label: string };
  measured: { width: number; height: number };
  position: Vector2D;
  type: string;
}

export interface Wall {
  id: string;
  measured: { width: number; height: number };
  data: { label: string };
  position: Vector2D;
  type: string;
}

const AGENT_SPEED = 10;
const MIN_DISTANCE = 120;
const NODE_WIDTH = 106;
export const AGENT_AMOUNT = 60;

const VECTOR_FIELD = createNoise2D();

export function getVectorAt(xpos: number, ypos: number) {
  const angle = VECTOR_FIELD(xpos / 500, ypos / 500);

  return fromAngle(angle);
}

export function isAgentNode(node: any): node is Agent {
  return node.type === "agentNode";
}
export function isWallOrStandNode(node: any): node is Wall | Stand {
  return node.type === "wallNode" || node.type === "standNode";
}

// // Function to move an agent towards a target
// function moveTowards(agent: Agent, target: Vector2D, delta: number) {
//   const dist = distance(agent.position, target);
//   if (dist > 0) {
//     const direction = {
//       x: (target.x - agent.position.x) / dist,
//       y: (target.y - agent.position.y) / dist,
//     };
//     agent.position.x += direction.x * delta;
//     agent.position.y += direction.y * delta;
//   }
// }

// Function to determine if an agent is about to collide with a wall
function isCollidingWithWall(agent: Agent, walls: (Wall | Stand)[]): boolean {
  const radius = (NODE_WIDTH / 2) - 24;
  for (const wall of walls) {
    if (
      agent.position.x + radius > wall.position.x &&
      agent.position.x - radius < wall.position.x + wall.measured.width &&
      agent.position.y + radius > wall.position.y &&
      agent.position.y - radius < wall.position.y + wall.measured.height
    ) {
      agent.data.color = "red";
      return true;
    }
  }
  return false;
}

// Function to apply repelling force between two agents
function repelAgents(agentA: Agent, agentB: Agent) {
  const dist = distance(agentA.position, agentB.position);

  if (dist < MIN_DISTANCE && dist > 0) {
    // Calculate the direction of repulsion
    const delta = scalarMult(
      subtract(agentA.position, agentB.position),
      1 / dist
    );

    // Apply repulsion based on the overlap distance
    const overlap = (MIN_DISTANCE - dist) / MIN_DISTANCE;
    agentA.data.dv = add(agentA.data.dv, scalarMult(delta, overlap * 3));
  }
}

export function step(curAgent: Agent, objects: (Agent | Stand | Wall)[]) {
  const agent = { ...curAgent };

  const randomWander = getVectorAt(curAgent.position.x, curAgent.position.y);

  agent.data.dv = addDir(agent.data.dv, randomWander);

  //  Avoid collisions with other agents
  objects.forEach((object) => {
    if (object !== curAgent && isAgentNode(object)) {
      repelAgents(agent, object);
    }
  });

  agent.position = add(agent.position, scalarMult(agent.data.dv, AGENT_SPEED));

  // Check if the agent is about to hit a wall and prevent movement if needed
  if (isCollidingWithWall(agent, objects.filter(isWallOrStandNode))) {
    // Reverse the movement to avoid collision
    agent.position = subtract(
      agent.position,
      scalarMult(agent.data.dv, AGENT_SPEED)
    );
    agent.data.dv = randomVec();
  }
  if (
    agent.position.x > 1000 + NODE_WIDTH ||
    agent.position.y > 600 + NODE_WIDTH ||
    agent.position.x < -2000 - NODE_WIDTH ||
    agent.position.y < -600 - NODE_WIDTH
  ) {
    return null;
  }

  return agent;
}
