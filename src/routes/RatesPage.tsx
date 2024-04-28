import { useEffect, useState } from "react";
import { LoaderData, SelectKeys, apiURL, flags } from "./ConversionPage";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

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

  function handleChangeFromCurrency<Selection>(keys: Selection): any {
    const newKeys = keys as SelectKeys;
    const exchangeRates = currencyOptions;
    const value = exchangeRates[newKeys.currentKey];

    if (value) {
      if (value !== toCurrency) {
        setFromCurrency(value);
        localStorage.setItem("fromCurrency", value);
        setSearchParams((searchParams) => {
          searchParams.set("from", Object.values(newKeys)[0]);
          return searchParams;
        });
        setSelectedFrom(newKeys.currentKey.toString());
        localStorage.setItem(
          "selectedFromCurrency",
          newKeys.currentKey.toString(),
        );
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
    // ? Change to h-4/5 if issues on mobile
    <div
      className="mx-auto h-[calc(100vh-180px)] w-fit lg:flex lg:flex-row"
      id="currencyRatesContainer"
    >
      <div id="rateOptionContainer" className="optionContainter lg:mr-3">
        <div className="mb-6">
          <Select
            label="Select Currency"
            className="w-80 max-w-xs text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900 ",
            }}
            startContent={
              <span
                className={`exchangeRate fi ${currencyFlags[fromCurrency]} relative rounded-sm`}
              ></span>
            }
            selectedKeys={[selectedFrom]}
            onSelectionChange={handleChangeFromCurrency}
          >
            {/* ? Consider adding full currency names from /currencies endpoint */}
            {currencyOptions.map((option, index) => {
              return (
                <SelectItem
                  className="text-white"
                  key={index}
                  value={option + " - " + currencyNames[index]}
                  startContent={
                    <span className={`fi ${flags[index]} rounded-sm`}></span>
                  }
                >
                  {option + " - " + currencyNames[index]}
                </SelectItem>
              );
            })}
          </Select>
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

export const currencyFlags: { [key: string]: string } = {
  AUD: "fi-au",
  BGN: "fi-bg",
  BRL: "fi-br",
  CAD: "fi-ca",
  CHF: "fi-ch",
  CNY: "fi-cn",
  CZK: "fi-cz",
  DKK: "fi-dk",
  EUR: "fi-eu",
  GBP: "fi-gb",
  HKD: "fi-hk",
  HUF: "fi-hu",
  IDR: "fi-id",
  ILS: "fi-il",
  INR: "fi-in",
  ISK: "fi-is",
  JPY: "fi-jp",
  KRW: "fi-kr",
  MXN: "fi-mx",
  MYR: "fi-my",
  NOK: "fi-no",
  NZD: "fi-nz",
  PHP: "fi-ph",
  PLN: "fi-pl",
  RON: "fi-ro",
  SEK: "fi-se",
  SGD: "fi-sg",
  THB: "fi-th",
  TRY: "fi-tr",
  USD: "fi-us",
  ZAR: "fi-za",
};
