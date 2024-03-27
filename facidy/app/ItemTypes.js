import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";

// Array of JSX elements
const Elements = [
  {
    id: 1,
    element: (
      <Grid container spacing={1} alignItems="center" key={1}>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="filled-basic" label="Filled" variant="filled" />
          </Box>
        </Grid>
      </Grid>
    ),
  },
  {
    id: 2,
    element: (
      <>
        <Checkbox disabled />
        <ListItemText primary="Check Box" />
      </>
    ),
  },
  {
    id: 3,
    element: (
      <Select
        disabled
        native
        value={10}
        onChange={(e) => console.log(e.target.value)}
        key={3}
      >
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    ),
  },
];

export default Elements;
