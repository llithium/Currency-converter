import { Button, ButtonGroup } from "@nextui-org/react";
import React from "react";

export default function ModeSelection(props) {
  return (
    <div id="buttonContainer" className=" mx-auto w-80">
      {/* <button onClick={props.handleConvert}>Convert</button>
      <button onClick={props.handleViewRates}>View Rates</button> */}
      {/* <Stack direction="row" spacing={2}> */}
      <ButtonGroup className="w-full">
        <Button
          className=" my-6 inline-block w-1/2  px-4 py-2"
          size="small"
          onClick={props.handleConvert}
        >
          Conversion
        </Button>
        <Button
          className="my-6 inline-block w-1/2  px-4 py-2"
          size="small"
          onClick={props.handleViewRates}
        >
          Rates
        </Button>
      </ButtonGroup>
      {/* </Stack> */}
    </div>
  );
}
