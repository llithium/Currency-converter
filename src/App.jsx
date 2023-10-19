import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import axios from "axios";
import CurrencyRates from "./CurrencyRates";
import ModeSelection from "./ModeSelection";

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
  const [viewRates, setViewRates] = useState(true);
  const [viewExchangeRates, setViewExchangeRates] = useState([]);
  const [viewExchangeRatesOptions, setViewExchangeRatesOptions] = useState([]);

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
      let options = [Object.keys(response.data.rates)];
      options = options[0];
      options = [
        ...options.slice(0, 9),
        response.data.base,
        ...options.slice(9),
      ];
      console.log(options);

      setCurrencyOptions([...options]);
      setViewExchangeRatesOptions([...Object.keys(response.data.rates)]);
      console.log(viewExchangeRatesOptions[0]);
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
          apiURL + `/latest?from=${fromCurrency}&to=${toCurrency}`,
        );
        setExchangeRate(Object.values(response.data.rates)[0]);
      }
      setExchange();
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    async function setRates() {
      const response = await axios.get(apiURL + `/latest?from=${fromCurrency}`);
      const rates = [Object.values(response.data.rates)];
      const ratesOptions = [Object.keys(response.data.rates)];

      setViewExchangeRates([...rates]);
      setViewExchangeRatesOptions([...ratesOptions]);
      console.log(response.data);
    }
    setRates();
  }, [fromCurrency]);

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
  function handleViewRates() {
    setViewRates(false);
  }
  function handleConvert() {
    setViewRates(true);
  }

  {
    if (viewRates) {
      return (
        <div id="mainContainer">
          <h1>Currency Converter</h1>
          <div id="contentContainer">
            <ModeSelection
              handleConvert={handleConvert}
              handleViewRates={handleViewRates}
            />

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
        </div>
      );
    } else {
      return (
        <div id="mainContainer">
          <h1>Exchanage Rates</h1>
          <div id="contentContainer">
            <ModeSelection
              handleConvert={handleConvert}
              handleViewRates={handleViewRates}
            />
            <CurrencyRates
              viewExchangeRatesOptions={viewExchangeRatesOptions}
              viewExchangeRates={viewExchangeRates}
              currencyOptions={currencyOptions}
              fromCurrency={fromCurrency}
              onChangeFromCurrency={handleChangeFromCurrency}
            />
          </div>
        </div>
      );
    }
  }
}

export default App;
