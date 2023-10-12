import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import axios from "axios";

const apiURL = "https://api.frankfurter.app";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  const [fromCurrencyFormat, setFromCurrencyFormat] = useState({
    locale: "en-US",
    currency: "EUR",
  });
  const [toCurrencyFormat, setToCurrencyFormat] = useState({
    locale: "en-US",
    currency: "USD",
  });

  let toAmount, fromAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
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
        setExchangeRate(Object.values(response.data.rates)[0]);
      }
      setExchange();
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(value) {
    setAmount(value);
    setAmountFrom(true);
  }
  function handleToAmountChange(value) {
    setAmount(value);
    setAmountFrom(false);
  }

  function handleChangeFromCurrency(event) {
    const value = event.target.value;
    setFromCurrency(value);
    setFromCurrencyFormat({
      locale: "en-US",
      currency: value,
    });
  }
  function handleChangeToCurrency(event) {
    const value = event.target.value;
    setToCurrency(value);
    setToCurrencyFormat({
      locale: "en-US",
      currency: value,
    });
  }

  return (
    <div id="mainContainer">
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onChangeFromCurrency={handleChangeFromCurrency}
        onChangeToCurrency={handleChangeToCurrency}
        fromAmount={fromAmount}
        toAmount={toAmount}
        onChangeFromAmount={handleFromAmountChange}
        onChangeToAmount={handleToAmountChange}
        fromCurrencyFormat={fromCurrencyFormat}
        toCurrencyFormat={toCurrencyFormat}
      />
    </div>
  );
}

export default App;
