import React from "react";

export default function ModeSelection(props) {
  return (
    <div>
      <button onClick={props.handleConvert}>Convert</button>
      <button onClick={props.handleViewRates}>View Rates</button>
    </div>
  );
}
