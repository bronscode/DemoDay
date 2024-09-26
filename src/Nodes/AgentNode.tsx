import React from 'react';

import "./AgentNode.css"
  
function AgentNode({ data }) {

  return (
		<div
			className={`AgentNode`} style={{ backgroundColor: data.color}}>
				<span>x</span>
		</div>
  );
}

export default AgentNode