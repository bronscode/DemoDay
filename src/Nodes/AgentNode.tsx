import React from 'react';

import "./AgentNode.css"
  
function AgentNode({ data }) {

    const r = 0.5 + 0.5 * Math.sin(Number(data.id) * 10000);
	const hue = Math.floor(r * 360);

  return (
    <>
			<div
				className={`AgentNode`}
				style={{ filter: `hue-rotate(${hue}deg)` }}
			>
				<label>{data.params ? data.params.tag : `Agent ${data.id}`}</label>
			</div>
		</>
  );
}

export default AgentNode