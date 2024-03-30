import { elementsEnum } from "./ItemTypes";
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
function generateJsonArray(elementIdMap, elements) {
  const result = [];
  elements.forEach((element, index) => {
    const elementType = elementIdMap[element.id];
    if (elementType) {
      let jsonObject = {};
      if (element.id > 0) {
        jsonObject = {
          type: elementType,
          draggable: true, // Set to true if it exists in the enum
          children: {},
          name: `${elementType} ${index + 1}`,
          // TODO the naming could get repeated when the element is deleted
          // or when using recursion change the naming system
        };
        if (elementType === "Select") jsonObject.value = "";
      } else {
        jsonObject = {
          type: elementType,
          draggable: true, // Set to true if it exists in the enum
          children: {
            ...generateJsonArray(elementIdMap, element.element.children),
          },
          name: `${elementType} ${index + 1}`,
        };
      }
      result.push(jsonObject);
    }
  });
  return result;
}
function generatedBlocklyBlocks(jsonObject) {
  const blocks = [];
  jsonObject.forEach((element) => {
    Blockly.Blocks[`${element.name}`] = {
      init: function () {
        this.appendDummyInput().appendField(`${element.name}`);
        this.setPreviousStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };
    blocks.push({
      kind: "block",
      type: `${element.name}`,
    });
  });
  return blocks;
}

export { generateJsonArray, generatedBlocklyBlocks };
