import { Input, Select, SelectItem } from "@nextui-org/react";
import getSymbolFromCurrency from "currency-symbol-map";
import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const flags = [
  "fi-au",
  "fi-bg",
  "fi-br",
  "fi-ca",
  "fi-ch",
  "fi-cn",
  "fi-cz",
  "fi-dk",
  "fi-gb",
  "fi-eu",
  "fi-hk",
  "fi-hu",
  "fi-id",
  "fi-il",
  "fi-in",
  "fi-is",
  "fi-jp",
  "fi-kr",
  "fi-mx",
  "fi-my",
  "fi-no",
  "fi-nz",
  "fi-ph",
  "fi-pl",
  "fi-ro",
  "fi-se",
  "fi-sg",
  "fi-th",
  "fi-tr",
  "fi-us",
  "fi-za",
];

export const apiURL = "https://api.frankfurter.app";

export async function ConversionPageLoader() {
  try {
    let response = await axios.get(apiURL + "/latest");
    let options = [Object.keys(response.data.rates)][0];
    options = [...options.slice(0, 9), response.data.base, ...options.slice(9)];
    const currencyOptions = [...options];
    const data = response.data;
    return {
      data,
      currencyOptions,
    };
  } catch (error) {
    console.log(error);
  }
}

export interface SelectKeys {
  0: string;
  anchorKey: number;
  currentKey: number;
}

export interface ResponseData {
  amount: number;
  base: string;
  date: Date;
  rates: { [key: string]: number };
}

export interface LoaderData {
  data: ResponseData;
  currencyOptions: string[];
}

export default function ConversionPage() {
  let { data, currencyOptions } = useLoaderData() as LoaderData;
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [selectedFrom, setSelectedFrom] = useState("9");
  const [selectedTo, setSelectedTo] = useState("29");
  const [searchParams, setSearchParams] = useSearchParams();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(
    Object.values(data.rates)[28],
  );

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
    const selectedFromCurrency = localStorage.getItem("selectedFromCurrency");
    const selectedToCurrency = localStorage.getItem("selectedToCurrency");
    const fromCurrency = localStorage.getItem("fromCurrency");
    const toCurrency = localStorage.getItem("toCurrency");

    selectedFromCurrency && setSelectedFrom(selectedFromCurrency);
    selectedToCurrency && setSelectedTo(selectedToCurrency);
    fromCurrency && setFromCurrency(fromCurrency);
    toCurrency && setToCurrency(toCurrency);

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
    if (searchParams.has("amount")) {
      setAmount(parseFloat(searchParams.get("amount") as string));
    }
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      async function setExchange() {
        try {
          const response = await axios.get(
            apiURL + `/latest?from=${fromCurrency}&to=${toCurrency}`,
          );
          const data: ResponseData = response.data;

          setExchangeRate(Object.values(data.rates)[0]);
        } catch (error) {
          console.log(error);
        }
      }
      setExchange();
    }
  }, [fromCurrency, toCurrency]);

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
        localStorage.setItem("selectedToCurrency", fromCurrency);

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

  function handleChangeToCurrency<Selection>(keys: Selection): any {
    const newKeys = keys as SelectKeys;
    const exchangeRates = currencyOptions;
    const value = exchangeRates[newKeys.currentKey];
    if (value) {
      if (value !== fromCurrency) {
        setToCurrency(value);
        setSearchParams((searchParams) => {
          searchParams.set("to", Object.values(newKeys)[0]);
          return searchParams;
        });
        localStorage.setItem("toCurrency", value);
        setSelectedTo(newKeys.currentKey.toString());
        localStorage.setItem(
          "selectedToCurrency",
          newKeys.currentKey.toString(),
        );
      } else {
        setToCurrency(fromCurrency);

        setSelectedTo(currencyOptions.indexOf(fromCurrency).toString());
        setSearchParams((searchParams) => {
          searchParams.set(
            "to",
            currencyOptions.indexOf(fromCurrency).toString(),
          );
          return searchParams;
        });
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
      id="currencyRowContainer"
      className="mx-auto w-fit xl:flex xl:flex-row"
    >
      <div className="optionContainter mb-6 xl:mr-3">
        <div>
          <Select
            label="From"
            name="from"
            className="max-w-xs text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900",
            }}
            selectedKeys={[selectedFrom]}
            onSelectionChange={handleChangeFromCurrency}
          >
            {currencyOptions.map((option, index) => {
              return (
                <SelectItem
                  className="text-white"
                  key={index}
                  value={option}
                  startContent={
                    <span className={`fi ${flags[index]} rounded-sm`}></span>
                  }
                >
                  {option}
                </SelectItem>
              );
            })}
          </Select>
        </div>
        <Input
          className=""
          classNames={{
            inputWrapper:
              "dark:hover:bg-zinc-800/60 dark:bg-stone-950 h-14 w-80 rounded-xl dark:focus-within:bg-stone-950/60",
          }}
          startContent={<div>{getSymbolFromCurrency(fromCurrency)}</div>}
          value={fromAmount ? fromAmount.toString() : ""}
          onValueChange={(value) => {
            setAmount(parseFloat(value));
            setAmountFrom(true);
            setSearchParams((searchParams) => {
              searchParams.set("amount", value);
              return searchParams;
            });
          }}
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
        />
      </div>
      <div className="optionContainter xl:ml-3">
        <div>
          <Select
            label="To"
            name="to"
            className="max-w-xs text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900",
            }}
            value={toCurrency}
            selectedKeys={[selectedTo]}
            onSelectionChange={handleChangeToCurrency}
          >
            {currencyOptions.map((option, index) => {
              return (
                <SelectItem
                  className="text-white"
                  key={index}
                  value={option}
                  startContent={
                    <span className={`fi ${flags[index]} rounded-sm`}></span>
                  }
                >
                  {option}
                </SelectItem>
              );
            })}
          </Select>
        </div>
        <Input
          className=""
          classNames={{
            inputWrapper:
              "dark:hover:bg-zinc-800/60 dark:bg-stone-950 h-14 w-80 rounded-xl dark:focus-within:bg-stone-950/60",
          }}
          startContent={<div>{getSymbolFromCurrency(toCurrency)}</div>}
          value={toAmount ? toAmount.toString() : ""}
          onValueChange={(value) => {
            setAmount(parseFloat(value));
            setAmountFrom(false);
            setSearchParams((searchParams) => {
              searchParams.set("amount", value);
              return searchParams;
            });
          }}
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
        />
      </div>
    </div>
  );
}
