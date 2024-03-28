function generateJsonArray(elementIdMap, elements) {
  const result = [];
  elements.forEach((element) => {
    const elementType = elementIdMap[element.id];
    if (elementType) {
      let jsonObject = {};
      if (element.id > 0) {
        jsonObject = {
          type: elementType,
          draggable: true, // Set to true if it exists in the enum
          children: [],
        };
      } else {
        jsonObject = {
          type: elementType,
          draggable: true, // Set to true if it exists in the enum
          children: generateJsonArray(elementIdMap, element.element.children),
        };
      }
      result.push(jsonObject);
    }
  });
  return result;
}
export default generateJsonArray;
