import React from "react";
import { useDrag } from "react-dnd";
function DraggableElement({ id, element }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <span style={{ opacity: isDragging ? 0.5 : 1, width: "100%" }} ref={drag}>
      {element}
    </span>
  );
}

export default DraggableElement;
