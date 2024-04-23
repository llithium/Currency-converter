import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="bg-black dark">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
