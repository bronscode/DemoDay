import { NodeResizer, useReactFlow } from "@xyflow/react";

import "./StandNode.css";

function StandNode({ id, data }) {
  const { getNodes, setNodes } = useReactFlow();

  const r = 0.5 + 0.5 * Math.sin(Number(id) * 10000);
  const hue = Math.floor(r * 360);
  return (
    <>
      <NodeResizer
        lineStyle={{ filter: `hue-rotate(${hue}deg)` }}
        handleStyle={{ filter: `hue-rotate(${hue}deg)` }}
        onResizeEnd={(x, ResizeParams) => {
          const nodes = getNodes();
          setNodes(
            nodes.map((node) =>
              node.id === id
                ? {
                    ...node,
                    data: { width: ResizeParams.x, height: ResizeParams.y, ...data },
                  }
                : node
            )
          );
        }}
        minWidth={32}
        minHeight={32}
      />
      <div className={`StandNode`}>
        <label>{data.label}</label>
      </div>
    </>
  );
}

export default StandNode;
