import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import axios from "axios";

const apiURL = "https://api.frankfurter.app";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    async function getExchange() {
      const response = await axios.get(apiURL + "/latest");
      setCurrencyOptions([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
    }
    getExchange();
  }, []);

  return (
    <div id="mainContainer">
      <h1>Currency Converter</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
    </div>
  );
}

export default App;
