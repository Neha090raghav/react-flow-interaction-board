import React from "react";
import { blocksData } from "../data/block";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      {blocksData.map((block) => (
        <div
          key={block.id}
          className="block"
          draggable
          onDragStart={(e) => onDragStart(e, block.type)}
        >
          {block.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
