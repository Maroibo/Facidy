"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import Elements from "./ItemTypes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainArea from "./MainArea";
import DaragableElement from "./DaragableElement";

function UiWorkspace() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container>
        <Grid item xs={3}>
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
          >
            <MyDropdown />
          </Drawer>
        </Grid>

        {/* Main Content */}
        <Grid item xs={9}>
          <MainArea orginalElements={Elements} />
        </Grid>
      </Grid>
    </DndProvider>
  );
}

function MyDropdown() {
  const [open, setOpen] = React.useState(true);
  const renderElements = Elements.map((elementObject) => (
    <ListItemButton key={elementObject.id} sx={{ pl: 4 }}>
      <DaragableElement id={elementObject.id} element={elementObject.element} />
    </ListItemButton>
  ));
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Controls
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Components" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {renderElements}
        </List>
      </Collapse>
    </List>
  );
}

export default UiWorkspace;
