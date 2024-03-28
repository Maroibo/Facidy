"use client";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import ConfigFiles from "./content";
import * as styles from "./b-styles.css";
import { useState, useEffect, createElement } from "react";
function BlocklyMain() {
  const [toolboxConfiguration, setToolboxConfiguration] = useState(
    ConfigFiles.INITIAL_TOOLBOX_JSON
  );
  const [generatedXml, setGeneratedXml] = useState("");
  const [generatedJson, setGeneratedJson] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    window.setTimeout(() => {
      setToolboxConfiguration((prevConfig) => ({
        ...prevConfig,
        contents: [
          ...prevConfig.contents,
          {
            kind: "category",
            name: "Dynamically added category",
            contents: [
              { kind: "block", type: "text" },
              {
                kind: "block",
                blockxml:
                  '<block type="text_print"><value name="TEXT"><shadow type="text">abc</shadow></value></block>',
              },
            ],
          },
        ],
      }));
    }, 2000);

    window.setTimeout(() => {
      setToolboxConfiguration((prevConfig) => ({
        ...prevConfig,
        contents: [
          ...prevConfig.contents.slice(0, prevConfig.contents.length - 1),
          {
            ...prevConfig.contents[prevConfig.contents.length - 1],
            contents: [{ kind: "block", type: "text" }],
          },
        ],
      }));
    }, 4000);

    window.setTimeout(() => {
      setToolboxConfiguration((prevConfig) => ({
        ...prevConfig,
        contents: [
          ...prevConfig.contents.slice(0, prevConfig.contents.length - 1),
        ],
      }));
    }, 10000);
  }, []);

  const onWorkspaceChange = (workspace) => {
    workspace.registerButtonCallback("myFirstButtonPressed", () => {
      alert("button is pressed");
    });
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    setGeneratedXml(newXml);
    const newJson = JSON.stringify(
      Blockly.serialization.workspaces.save(workspace)
    );
    setGeneratedJson(newJson);
    const code = javascriptGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
  };

  const onXmlChange = (newXml) => {
    setGeneratedXml(newXml);
  };

  const onJsonChange = (newJson) => {
    setGeneratedJson(JSON.stringify(newJson));
  };
  const [serialState, setSerialState] = useState("JSON");
  return (
    <>
      <div style={{ height: "600px", width: "800px" }}>
        {createElement(
          "button",
          {
            onClick: function onClick(e) {
              return setSerialState(
                e.target.innerText === "XML" ? "XML" : "JSON"
              );
            },
          },
          serialState === "XML" ? "JSON" : "XML"
        )}
        <BlocklyWorkspace
          key={serialState}
          toolboxConfiguration={toolboxConfiguration}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#ccc",
              snap: true,
            },
          }}
          initialXml={
            serialState === "XML" ? ConfigFiles.INITIAL_XML : undefined
          }
          initialJson={
            serialState === "JSON" ? ConfigFiles.INITIAL_JSON : undefined
          }
          className="fill-height"
          onWorkspaceChange={onWorkspaceChange}
          onXmlChange={onXmlChange}
          onJsonChange={onJsonChange}
        />
      </div>
      <pre>{generatedXml}</pre>
      <p>{generatedJson}</p>
      <textarea
        style={{ height: "200px", width: "400px" }}
        value={generatedCode}
        readOnly
      />
    </>
  );
}

export default BlocklyMain;
