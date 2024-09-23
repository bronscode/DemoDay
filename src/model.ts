export interface Agent {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type: string;
  draggable: boolean;
};

export interface Stand {
  id: string;
  data: { label: string };
  measured: { width: number, height: number};
  position: { x: number; y: number };
  type: string;
};

export interface Wall {
  id: string;
  measured: { width: number, height: number};
  data: { label: string };
  position: { x: number; y: number };
  type: string;
};

const AGENT_SPEED = 200;
const MIN_DISTANCE = 100;

// Function to calculate distance between two points
function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
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
  for (const wall of walls) {
    if (
      agent.position.x > wall.position.x &&
      agent.position.x < wall.position.x + wall.measured.width &&
      agent.position.y > wall.position.y &&
      agent.position.y < wall.position.y + wall.measured.height
    ) {
      console.log("wall")
      return true;
    }
  }
  return false;
}

// // Function to apply repelling force between two agents
function repelAgents(agentA: Agent, agentB: Agent) {
  const dist = distance(agentA.position.x, agentA.position.y, agentB.position.x, agentB.position.y);

  if (dist < MIN_DISTANCE && dist > 0) {
    // Calculate the direction of repulsion
    const delta = {
      x: (agentA.position.x - agentB.position.x) / dist,
      y: (agentA.position.y - agentB.position.y) / dist,
    };

    // Apply repulsion based on the overlap distance
    const overlap = MIN_DISTANCE - dist;
    agentA.position.x += delta.x * overlap * 0.3; 
    agentA.position.y += delta.y * overlap * 0.3;
  }
}

// Step function to update the agents' positions with collision avoidance
// function updateAgents(
//   agents: Agent[],
//   stands: Stand[],
//   walls: Wall[],
//   deltaTime: number,
//   agentRadius: number
// ): void {
//   agents.forEach((agent, index) => {
   
//   });
// }

export function step(curAgent: Agent, objects: (Agent | Stand | Wall)[]) {

  const agent = {...curAgent}

 // Add random wandering (small random movement)
 const randomWander = {
   x: (Math.random() - 0.5) * AGENT_SPEED,
   y: (Math.random() - 0.5) * AGENT_SPEED,
 };
 agent.position.x += randomWander.x;
 agent.position.y += randomWander.y;

 // Check if the agent is about to hit a wall and prevent movement if needed
 if (isCollidingWithWall(agent, objects.filter(isWallOrStandNode))) {
   // Reverse the movement to avoid collision
   agent.position.x -= randomWander.x;
   agent.position.y -= randomWander.y;
 }

//  Avoid collisions with other agents
objects.forEach((object) => {
  if (object !== agent && isAgentNode(object)) {
    repelAgents(agent, object);
  }
})
  return agent
}
