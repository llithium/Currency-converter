import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import axios from "axios";

const apiURL = "https://api.frankfurter.app";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function getExchange() {
      const response = await axios.get(apiURL + "/latest");
      setCurrencyOptions([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
      setFromCurrency(response.data.base);
      setToCurrency(Object.keys(response.data.rates)[28]);
    }
    getExchange();
  }, []);

  return (
    <div id="mainContainer">
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onChangeFromCurrency={(event) => setFromCurrency(event.target.value)}
        onChangeToCurrency={(event) => setToCurrency(event.target.value)}
      />
    </div>
  );
}

export default App;
