import React from 'react';
import { NodeResizer } from '@xyflow/react';

import "./StandNode.css"
  
function StandNode({ data }) {

    const r = 0.5 + 0.5 * Math.sin(Number(data.id) * 10000);
	const hue = Math.floor(r * 360);
  return (
    <>
			<NodeResizer
				lineStyle={{ filter: `hue-rotate(${hue}deg)` }}
				handleStyle={{ filter: `hue-rotate(${hue}deg)` }}
				minWidth={100}
				minHeight={30}
			/>
			<div
				className={`StandNode`}
				style={{ background: `brown` }}
			>
				<label>{data.params ? data.params.tag : "Testlabel"}</label>
			</div>
		</>
  );
}

export default StandNode