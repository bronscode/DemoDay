import React from "react";

import "./AgentNode.css";

function AgentNode({ data }) {
  return (
    <div className={`AgentNode ${data.collision ? "collision" : ""}`}></div>
  );
}

export default AgentNode;
