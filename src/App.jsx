import { useEffect, useState } from "react";
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
  const [selectedFrom, setSelectedFrom] = useState(9);
  const [selectedTo, setSelectedTo] = useState(29);
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
      try {
        const response = await axios.get(apiURL + "/latest");
        let options = [Object.keys(response.data.rates)];
        options = options[0];
        options = [
          ...options.slice(0, 9),
          response.data.base,
          ...options.slice(9),
        ];

        setCurrencyOptions([...options]);
        setFromCurrency(response.data.base);
        setToCurrency(Object.keys(response.data.rates)[28]);
        setExchangeRate(Object.values(response.data.rates)[28]);
      } catch (error) {
        console.log(error);
      }
    }
    getExchange();
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      async function setExchange() {
        try {
          const response = await axios.get(
            apiURL + `/latest?from=${fromCurrency}&to=${toCurrency}`,
          );
          setExchangeRate(Object.values(response.data.rates)[0]);
        } catch (error) {
          console.log(error);
        }
      }
      setExchange();
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    async function setRates() {
      try {
        const response = await axios.get(
          apiURL + `/latest?from=${fromCurrency}`,
        );
        const rates = [Object.values(response.data.rates)];
        const ratesOptions = [Object.keys(response.data.rates)];
        setViewExchangeRates([...rates]);
        setViewExchangeRatesOptions([...ratesOptions]);
      } catch (error) {
        console.log(error);
      }
    }
    setRates();
  }, [viewRates, fromCurrency]);

  function handleFromAmountChange(value) {
    setAmount(value);
    setAmountFrom(true);
  }
  function handleToAmountChange(value) {
    setAmount(value);
    setAmountFrom(false);
  }

  function handleChangeFromCurrency(event) {
    const exchangeRates = currencyOptions;
    const value = exchangeRates[event.currentKey];

    if (value) {
      if (value !== toCurrency) {
        setFromCurrency(value);
        setSelectedFrom(event.currentKey);
        setFromCurrencyFormat({
          locale: "en-US",
          currency: value,
        });
      } else {
        setToCurrency(fromCurrency);
        setSelectedTo(currencyOptions.indexOf(fromCurrency));
        setToCurrencyFormat({
          locale: "en-US",
          currency: fromCurrency,
        });
        setFromCurrency(toCurrency);
        setSelectedFrom(currencyOptions.indexOf(toCurrency));
        setFromCurrencyFormat({
          locale: "en-US",
          currency: toCurrency,
        });
      }
    } else {
    }
  }
  function handleChangeToCurrency(event) {
    const exchangeRates = currencyOptions;
    const value = exchangeRates[event.currentKey];

    if (value) {
      if (value !== fromCurrency) {
        setToCurrency(value);
        setSelectedTo(event.currentKey);
        setToCurrencyFormat({
          locale: "en-US",
          currency: value,
        });
      } else {
        setToCurrency(fromCurrency);
        setSelectedTo(currencyOptions.indexOf(fromCurrency));
        setToCurrencyFormat({
          locale: "en-US",
          currency: fromCurrency,
        });
        setFromCurrency(toCurrency);
        setSelectedFrom(currencyOptions.indexOf(toCurrency));
        setFromCurrencyFormat({
          locale: "en-US",
          currency: toCurrency,
        });
      }
    } else {
    }
  }
  function handleViewRates() {
    setViewRates(false);
  }
  function handleConvert() {
    setViewRates(true);
  }
  return (
    <div className="h-screen min-h-screen">
      {viewRates ? (
        // <div className="h-screen" id="mainContainer">
        <>
          <div
            className="mx-auto flex  h-full w-full flex-col items-center bg-content1 pb-12 "
            id="contentContainer"
          >
            <ModeSelection
              handleConvert={handleConvert}
              handleViewRates={handleViewRates}
            />

            <CurrencyRow
              currencyOptions={currencyOptions}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
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
        </>
      ) : (
        <div
          className="mx-auto flex h-screen min-h-screen w-full flex-col items-center  bg-content1 pb-12 "
          id="contentContainer"
        >
          <ModeSelection
            handleConvert={handleConvert}
            handleViewRates={handleViewRates}
          />
          <CurrencyRates
            viewExchangeRatesOptions={viewExchangeRatesOptions}
            viewExchangeRates={viewExchangeRates}
            currencyOptions={currencyOptions}
            selectedFrom={selectedFrom}
            onChangeFromCurrency={handleChangeFromCurrency}
          />
        </div>
      )}
    </div>
  );
}

export default App;
