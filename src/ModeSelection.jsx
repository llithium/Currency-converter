import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ModeSelection(props) {
  return (
    <div id="buttonContainer">
      {/* <button onClick={props.handleConvert}>Convert</button>
      <button onClick={props.handleViewRates}>View Rates</button> */}
      {/* <Stack direction="row" spacing={2}> */}
      <Button
        sx={{
          mx: 2,
          bgcolor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "grey",
          },
          width: "90px",
        }}
        size="small"
        variant="contained"
        onClick={props.handleConvert}
      >
        Convert
      </Button>
      <Button
        sx={{
          mx: 2,
          bgcolor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "grey",
          },
          width: "90px",
        }}
        size="small"
        variant="contained"
        onClick={props.handleViewRates}
      >
        Rates
      </Button>
      {/* </Stack> */}
    </div>
  );
}
