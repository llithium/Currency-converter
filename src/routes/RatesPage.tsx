import { useEffect, useState } from "react";
import { LoaderData, apiURL } from "./ConversionPage";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import { currencyFlags } from "../utils/currencyFlags";

export default function RatesPage() {
  const { currencyOptions, currencyNames } = useLoaderData() as LoaderData;
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [selectedFrom, setSelectedFrom] = useState("9");
  const [, setSelectedTo] = useState("29");
  const [viewExchangeRates, setViewExchangeRates] = useState<number[]>([]);
  const [viewExchangeRatesOptions, setViewExchangeRatesOptions] = useState<
    string[]
  >([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const localSelectedFromCurrency = localStorage.getItem(
      "selectedFromCurrency",
    );
    const localFromCurrency = localStorage.getItem("fromCurrency");
    const localSelectedToCurrency = localStorage.getItem("selectedToCurrency");
    const localToCurrency = localStorage.getItem("toCurrency");

    localSelectedFromCurrency && setSelectedFrom(localSelectedFromCurrency);
    localSelectedToCurrency && setSelectedTo(localSelectedToCurrency);
    localFromCurrency && setFromCurrency(localFromCurrency);
    localToCurrency && setToCurrency(localToCurrency);
    if (searchParams.has("from")) {
      setSelectedFrom(searchParams.get("from") as string);
      const from = parseInt(searchParams.get("from") as string);
      setFromCurrency(currencyOptions[from]);
    }
    if (searchParams.has("to")) {
      setSelectedTo(searchParams.get("to") as string);
      const to = parseInt(searchParams.get("to") as string);
      setToCurrency(currencyOptions[to]);
    }
  }, []);

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
  }, [fromCurrency]);

  function handleChangeFromCurrency<Selection>(key: Selection): any {
    const newKey = key as string;
    const exchangeRates = currencyOptions;
    const value = exchangeRates[parseFloat(newKey)];

    if (value) {
      if (value !== toCurrency) {
        setFromCurrency(value);
        localStorage.setItem("fromCurrency", value);
        setSearchParams((searchParams) => {
          searchParams.set("from", newKey);
          return searchParams;
        });
        setSelectedFrom(newKey);
        localStorage.setItem("selectedFromCurrency", newKey);
      } else {
        setToCurrency(fromCurrency);
        setSearchParams((searchParams) => {
          searchParams.set(
            "to",
            currencyOptions.indexOf(fromCurrency).toString(),
          );
          return searchParams;
        });
        localStorage.setItem("toCurrency", fromCurrency);
        setSelectedTo(currencyOptions.indexOf(fromCurrency).toString());
        localStorage.setItem(
          "selectedToCurrency",
          currencyOptions.indexOf(fromCurrency).toString(),
        );

        setFromCurrency(toCurrency);
        setSearchParams((searchParams) => {
          searchParams.set(
            "from",
            currencyOptions.indexOf(toCurrency).toString(),
          );
          return searchParams;
        });
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
  return (
    <div
      className="mx-auto h-[calc(100svh-180px)] w-fit lg:flex lg:flex-row"
      id="currencyRatesContainer"
    >
      <div id="rateOptionContainer" className="optionContainter lg:mr-3">
        <div className="mb-6">
          <Autocomplete
            label="Select Currency"
            className="w-80 max-w-xs text-lg text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900 ",
            }}
            startContent={
              <span
                className={`exchangeRate fi ${currencyFlags[fromCurrency]} relative rounded-sm`}
              ></span>
            }
            selectedKey={selectedFrom}
            onSelectionChange={handleChangeFromCurrency}
          >
            {currencyOptions.map((option, index) => {
              return (
                <AutocompleteItem
                  className="text-white"
                  key={index}
                  value={option + " - " + currencyNames[index]}
                  startContent={
                    <span
                      className={`fi ${currencyFlags[option]} rounded-sm`}
                    ></span>
                  }
                >
                  {option + " - " + currencyNames[index]}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
        </div>
      </div>
      <div className="ratesOptionContainter h-full max-h-full w-80 rounded-lg lg:ml-3">
        <ul className="h-full overflow-auto rounded-lg">
          {viewExchangeRatesOptions.map((option, index) => {
            return (
              <li
                className="ratesList border-b border-zinc-900/60 bg-zinc-800 px-4 py-1 font-semibold text-foreground lg:py-3"
                key={index}
              >
                <span
                  className={`exchangeRate fi ${currencyFlags[option]} mr-2  rounded-sm`}
                ></span>
                {getSymbolFromCurrency(option)} {viewExchangeRates[index]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
