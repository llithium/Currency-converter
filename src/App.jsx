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
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);

  let toAmount, fromAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    async function getExchange() {
      const response = await axios.get(apiURL + "/latest");
      setCurrencyOptions([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
      setFromCurrency(response.data.base);
      setToCurrency(Object.keys(response.data.rates)[28]);
      setExchangeRate(Object.values(response.data.rates)[28]);
    }
    getExchange();
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      async function setExchange() {
        const response = await axios.get(
          apiURL + `/latest?from=${fromCurrency}&to=${toCurrency}`
        );
        console.log(Object.values(response.data.rates)[0]);
        setExchangeRate(Object.values(response.data.rates)[0]);
      }
      setExchange();
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountFrom(true);
  }
  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountFrom(false);
  }

  return (
    <div id="mainContainer">
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onChangeFromCurrency={(event) => setFromCurrency(event.target.value)}
        onChangeToCurrency={(event) => setToCurrency(event.target.value)}
        fromAmount={fromAmount}
        toAmount={toAmount}
        onChangeFromAmount={handleFromAmountChange}
        onChangeToAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
