import { Button, ButtonGroup } from "@nextui-org/react";

interface ModeSelectionProps {
  handleConvert: Function;
  handleViewRates: Function;
  handleViewHistory: Function;
}

export default function ModeSelection(props: ModeSelectionProps) {
  return (
    <div id="buttonContainer" className=" mx-auto w-80">
      <ButtonGroup className="w-full">
        <Button
          className=" my-6 inline-block w-1/2  px-4 py-2"
          onClick={() => {
            props.handleConvert();
          }}
        >
          Conversion
        </Button>
        <Button
          className="my-6 inline-block w-1/2  px-4 py-2"
          onClick={() => {
            props.handleViewRates();
          }}
        >
          Rates
        </Button>
        <Button
          className="my-6 inline-block w-1/2  px-4 py-2"
          onClick={() => {
            props.handleViewHistory();
          }}
        >
          History
        </Button>
      </ButtonGroup>
    </div>
  );
}
