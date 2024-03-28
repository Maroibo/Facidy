import React from "react";
import { useDrop } from "react-dnd";
import Container from "@mui/material/Container";

const MainArea = ({ orginalElements }) => {
  const [elements, setElements] = React.useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => addElement(item.id), // Pass the item id to addElement
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  function addElement(id) {
    const elementToAdd = orginalElements.find((element) => element.id === id);
    if (elementToAdd) {
      setElements((prevElements) => [...prevElements, elementToAdd]);
    }
  }

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: isOver ? "lightblue" : "white",
      }}
    >
      {elements.map((element) => (
        <Container maxWidth="md" key={element.id}>
          {element.element}
        </Container>
      ))}
    </div>
  );
};

export default MainArea;
