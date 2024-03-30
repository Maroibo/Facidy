"use client";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import ConfigFiles from "./content";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import * as styles from "./b-styles.css";
function BlocklyMain() {
  const [toolboxConfiguration, setToolboxConfiguration] = useState(
    ConfigFiles.INITIAL_TOOLBOX_JSON
  );
  const [generatedJson, setGeneratedJson] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const onWorkspaceChange = (workspace) => {
    workspace.registerButtonCallback("myFirstButtonPressed", () => {
      alert("button is pressed");
    });
    const newJson = JSON.stringify(
      Blockly.serialization.workspaces.save(workspace)
    );
    setGeneratedJson(newJson);
    const code = javascriptGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
  };
  const onJsonChange = (newJson) => {
    setGeneratedJson(JSON.stringify(newJson));
  };
  return (
    <>
      <Container
        className="workspace-containers"
        maxWidth="false"
        sx={{ height: "100vh", padding: "0 !important" }}
      >
        <BlocklyWorkspace
          toolboxConfiguration={toolboxConfiguration}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#ccc",
              snap: true,
            },
          }}
          className="fill-height"
          onWorkspaceChange={onWorkspaceChange}
          onJsonChange={onJsonChange}
        />
      </Container>
    </>
  );
}

export default BlocklyMain;
