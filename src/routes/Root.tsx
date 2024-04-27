import { Button, ButtonGroup, NextUIProvider } from "@nextui-org/react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

function Root() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <NextUIProvider navigate={navigate}>
      <div id="buttonContainer" className=" mx-auto w-80">
        <ButtonGroup className="w-full">
          <Button
            className=" my-6 inline-block w-1/2 px-4 py-2 dark:bg-stone-950 dark:hover:bg-zinc-800/60 "
            onClick={() => {
              navigate({
                pathname: "/",
                search: `${searchParams}`,
              });
            }}
          >
            Conversion
          </Button>
          <Button
            className="my-6 inline-block w-1/2 px-4 py-2 dark:bg-stone-950 dark:hover:bg-zinc-800/60"
            onClick={() => {
              navigate({
                pathname: "/rates",
                search: `${searchParams}`,
              });
            }}
          >
            Rates
          </Button>
          <Button
            className="my-6 inline-block w-1/2 px-4 py-2 dark:bg-stone-950 dark:hover:bg-zinc-800/60"
            onClick={() => {
              navigate({
                pathname: "/history",
                search: `${searchParams}`,
              });
            }}
          >
            History
          </Button>
        </ButtonGroup>
      </div>
      <Outlet />
    </NextUIProvider>
  );
}

export default Root;
