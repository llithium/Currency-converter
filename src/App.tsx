import { useEffect, useState } from "react";
import CurrencyRow, { SelectKeys } from "./CurrencyRow";
import axios from "axios";
import CurrencyRates from "./CurrencyRates";
import ModeSelection from "./ModeSelection";
import HistoryView from "./HistoryView";

export const apiURL = "https://api.frankfurter.app";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  const [fromCurrencyFormat, setFromCurrencyFormat] = useState({
    locale: navigator.language,
    currency: "EUR",
  });
  const [toCurrencyFormat, setToCurrencyFormat] = useState({
    locale: navigator.language,
    currency: "USD",
  });
  const [viewRates, setViewRates] = useState(false);
  const [viewConvert, setViewConvert] = useState(true);
  const [viewHistory, setViewHistory] = useState(false);
  const [viewExchangeRates, setViewExchangeRates] = useState<number[]>([]);
  const [viewExchangeRatesOptions, setViewExchangeRatesOptions] = useState<
    string[]
  >([]);
  const [selectedFrom, setSelectedFrom] = useState("9");
  const [selectedTo, setSelectedTo] = useState("29");
  let toAmount: number | null, fromAmount: number | null;
  if (amountFrom) {
    if (amount >= 0) {
      fromAmount = amount;
      toAmount = parseFloat((amount * exchangeRate).toFixed(2));
    } else {
      fromAmount = null;
      toAmount = 0;
    }
  } else {
    if (amount >= 0) {
      toAmount = amount;
      fromAmount = parseFloat((amount / exchangeRate).toFixed(2));
    } else {
      toAmount = null;
      fromAmount = 0;
    }
  }

  useEffect(() => {
    async function getExchange() {
      const selectedFromCurrency = localStorage.getItem("selectedFromCurrency");
      const selectedToCurrency = localStorage.getItem("selectedToCurrency");
      const fromCurrency = localStorage.getItem("fromCurrency");
      const toCurrency = localStorage.getItem("toCurrency");

      selectedFromCurrency && setSelectedFrom(selectedFromCurrency);
      selectedToCurrency && setSelectedTo(selectedToCurrency);
      fromCurrency && setFromCurrency(fromCurrency);
      toCurrency && setToCurrency(toCurrency);

      if (fromCurrency) {
        try {
          let response = await axios.get(apiURL + "/latest");
          let options = [Object.keys(response.data.rates)][0];
          options = [
            ...options.slice(0, 9),
            response.data.base,
            ...options.slice(9),
          ];
          setCurrencyOptions([...options]);
          if (toCurrency) {
            try {
              response = await axios.get(
                apiURL + `/latest?from=${fromCurrency}&to=${toCurrency}`,
              );
              setToCurrency(toCurrency);
              setToCurrencyFormat({
                locale: navigator.language,
                currency: toCurrency,
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              response = await axios.get(
                apiURL + `/latest?from=${fromCurrency}&to=USD`,
              );
              setToCurrency("USD");
              setToCurrencyFormat({
                locale: navigator.language,
                currency: "USD",
              });
            } catch (error) {
              console.log(error);
            }
          }
          setFromCurrency(response.data.base);
          setExchangeRate(Object.values<number>(response.data.rates)[0]);
          setFromCurrencyFormat({
            locale: navigator.language,
            currency: fromCurrency,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        if (toCurrency) {
          try {
            const response = await axios.get(apiURL + "/latest");
            let options = [Object.keys(response.data.rates)][0];
            options = [
              ...options.slice(0, 9),
              response.data.base,
              ...options.slice(9),
            ];

            setCurrencyOptions([...options]);
            setFromCurrency(response.data.base);
          } catch (error) {
            console.log(error);
          }
          try {
            setToCurrency(toCurrency);
            setToCurrencyFormat({
              locale: navigator.language,
              currency: toCurrency,
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await axios.get(apiURL + "/latest");
            let options = [Object.keys(response.data.rates)][0];
            options = [
              ...options.slice(0, 9),
              response.data.base,
              ...options.slice(9),
            ];

            setCurrencyOptions([...options]);
            setFromCurrency(response.data.base);
            setToCurrency(Object.keys(response.data.rates)[28]);
            setExchangeRate(Object.values<number>(response.data.rates)[28]);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    getExchange();
  }, []);

  useEffect(() => {
    setFromCurrencyFormat({
      locale: navigator.language,
      currency: fromCurrency,
    });
  }, [fromCurrency]);

  useEffect(() => {
    setToCurrencyFormat({
      locale: navigator.language,
      currency: toCurrency,
    });
  }, [toCurrency]);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      async function setExchange() {
        try {
          const response = await axios.get(
            apiURL + `/latest?from=${fromCurrency}&to=${toCurrency}`,
          );
          setExchangeRate(Object.values<number>(response.data.rates)[0]);
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

        const rates = [Object.values<number>(response.data.rates)][0];
        const ratesOptions = [Object.keys(response.data.rates)][0];
        setViewExchangeRates([...rates]);
        setViewExchangeRatesOptions([...ratesOptions]);
      } catch (error) {
        console.log(error);
      }
    }
    setRates();
  }, [viewRates, fromCurrency]);

  function handleFromAmountChange(value: number) {
    setAmount(value);
    setAmountFrom(true);
  }
  function handleToAmountChange(value: number) {
    setAmount(value);
    setAmountFrom(false);
  }

  function handleChangeFromCurrency(keys: SelectKeys) {
    const exchangeRates = currencyOptions;
    const value = exchangeRates[parseInt(keys.currentKey)];

    if (value) {
      if (value !== toCurrency) {
        setFromCurrency(value);
        localStorage.setItem("fromCurrency", value);
        setSelectedFrom(keys.currentKey);
        localStorage.setItem("selectedFromCurrency", keys.currentKey);
      } else {
        setToCurrency(fromCurrency);
        localStorage.setItem("toCurrency", fromCurrency);
        setSelectedTo(currencyOptions.indexOf(fromCurrency).toString());
        localStorage.setItem("selectedtoCurrency", fromCurrency);
        setFromCurrency(toCurrency);
        localStorage.setItem("fromCurrency", toCurrency);
        setSelectedFrom(currencyOptions.indexOf(toCurrency).toString());
        localStorage.setItem(
          "selectedFromCurrency",
          currencyOptions.indexOf(toCurrency).toString(),
        );
      }
    } else {
    }
  }
  function handleChangeToCurrency(keys: SelectKeys) {
    const exchangeRates = currencyOptions;
    const value = exchangeRates[parseInt(keys.currentKey)];

    if (value) {
      if (value !== fromCurrency) {
        setToCurrency(value);
        localStorage.setItem("toCurrency", value);
        setSelectedTo(keys.currentKey);
        localStorage.setItem("selectedToCurrency", keys.currentKey);
      } else {
        setToCurrency(fromCurrency);
        localStorage.setItem("toCurrency", fromCurrency);
        setSelectedTo(currencyOptions.indexOf(fromCurrency).toString());
        localStorage.setItem(
          "selectedToCurrency",
          currencyOptions.indexOf(fromCurrency).toString(),
        );
        setFromCurrency(toCurrency);
        localStorage.setItem("fromCurrency", toCurrency);
        setSelectedFrom(currencyOptions.indexOf(toCurrency).toString());
        localStorage.setItem(
          "selectedFromCurrency",
          currencyOptions.indexOf(toCurrency).toString(),
        );
      }
    } else {
    }
  }
  function handleViewRates() {
    setViewRates(true);
    setViewConvert(false);
    setViewHistory(false);
  }
  function handleConvert() {
    setViewConvert(true);
    setViewRates(false);
    setViewHistory(false);
  }
  function handleViewHistory() {
    setViewConvert(false);
    setViewRates(false);
    setViewHistory(true);
  }
  return (
    <div className="h-screen min-h-screen">
      {viewConvert && (
        <>
          <div
            className="mx-auto flex  h-full w-full flex-col items-center bg-content1 pb-12 "
            id="contentContainer"
          >
            <ModeSelection
              handleConvert={handleConvert}
              handleViewRates={handleViewRates}
              handleViewHistory={handleViewHistory}
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
      )}
      {viewRates && (
        <div
          className="mx-auto flex  h-full w-full flex-col items-center bg-content1 pb-12 "
          id="contentContainer"
        >
          <ModeSelection
            handleConvert={handleConvert}
            handleViewRates={handleViewRates}
            handleViewHistory={handleViewHistory}
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
      {viewHistory && (
        <div
          className="mx-auto flex h-screen min-h-screen w-full flex-col items-center  bg-content1 pb-12 "
          id="contentContainer"
        >
          <ModeSelection
            handleConvert={handleConvert}
            handleViewRates={handleViewRates}
            handleViewHistory={handleViewHistory}
          />
          <HistoryView
            currencyOptions={currencyOptions}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            selectedFrom={selectedFrom}
            selectedTo={selectedTo}
            onChangeFromCurrency={handleChangeFromCurrency}
            onChangeToCurrency={handleChangeToCurrency}
            onChangeFromAmount={handleFromAmountChange}
            onChangeToAmount={handleToAmountChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
