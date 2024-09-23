import React from 'react';

import "./AgentNode.css"
  
function AgentNode({ data }) {

  return (
    <>
		<label>{data.label ? data.label : `Agent ${data.id}`}</label>
			<div
				className={`AgentNode`}>
			</div>
		</>
  );
}

export default AgentNode