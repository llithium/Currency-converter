import { Button } from "@nextui-org/react";
import React from "react";

export default function ModeSelection(props) {
  return (
    <div id="buttonContainer">
      {/* <button onClick={props.handleConvert}>Convert</button>
      <button onClick={props.handleViewRates}>View Rates</button> */}
      {/* <Stack direction="row" spacing={2}> */}
      <Button size="small" onClick={props.handleConvert}>
        Convert
      </Button>
      <Button size="small" onClick={props.handleViewRates}>
        Rates
      </Button>
      {/* </Stack> */}
    </div>
  );
}
