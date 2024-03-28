import React from "react";
import { useDrop } from "react-dnd";
import Container from "@mui/material/Container";
import generateJsonArray from "./elementsTree";
import { Elements, elementsEnum } from "./ItemTypes";

const MainArea = () => {
  const [elements, setElements] = React.useState([]);
  const [elementsTree, setElementsTree] = React.useState([]);
  const orginalElements = Elements;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => addElement(item.id), // Pass the item id to addElement
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  React.useEffect(() => {
    setElementsTree((prevElementsTree) => [
      ...prevElementsTree,
      ...generateJsonArray(elementsEnum, elements),
    ]);
  }, [elements]);
  function addElement(id) {
    const elementToAdd = orginalElements.find((element) => element.id === id);
    if (elementToAdd) {
      setElements((prevElements) => [...prevElements, elementToAdd]);
    }
  }
  // console.log(elementsTree);

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: isOver ? "lightblue" : "white",
      }}
    >
      {elements.map((element, index) => (
        <Container maxWidth="md" key={index}>
          {element.element}
        </Container>
      ))}
    </div>
  );
};

export default MainArea;
