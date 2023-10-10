import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  return (
    <div id="mainContainer">
      <h1>Currency Converter</h1>
      <CurrencyRow />
    </div>
  );
}

export default App;
