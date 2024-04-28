import { Input, Select, SelectItem } from "@nextui-org/react";
import getSymbolFromCurrency from "currency-symbol-map";
import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { currencyFlags } from "./RatesPage";

export const flags = [
  "fi-au",
  "fi-bg",
  "fi-br",
  "fi-ca",
  "fi-ch",
  "fi-cn",
  "fi-cz",
  "fi-dk",
  "fi-eu",
  "fi-gb",
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
    const response = await axios.get(apiURL + "/latest");
    const currencyOptionsResponce = await axios.get(apiURL + "/currencies");
    const currencyOptions = Object.keys(currencyOptionsResponce.data);
    const currencyNames = Object.values(currencyOptionsResponce.data);
    const data = response.data;

    return {
      data,
      currencyOptions,
      currencyNames,
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
  currencyNames: string[];
}

export default function ConversionPage() {
  const { data, currencyOptions, currencyNames } =
    useLoaderData() as LoaderData;
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [selectedFrom, setSelectedFrom] = useState("8");
  const [selectedTo, setSelectedTo] = useState("29");
  const [searchParams, setSearchParams] = useSearchParams();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(
    Object.values(data.rates)[28],
  );

  let toAmount: number, fromAmount: number;
  if (amountFrom) {
    if (amount >= 0) {
      fromAmount = amount;
      toAmount = parseFloat((amount * exchangeRate).toFixed(2));
    } else {
      fromAmount = 0;
      toAmount = 0;
    }
  } else {
    if (amount >= 0) {
      toAmount = amount;
      fromAmount = parseFloat((amount / exchangeRate).toFixed(2));
    } else {
      toAmount = 0;
      fromAmount = 0;
    }
  }

  useEffect(() => {
    const localSelectedFromCurrency = localStorage.getItem(
      "selectedFromCurrency",
    );
    const localSelectedToCurrency = localStorage.getItem("selectedToCurrency");
    const localFromCurrency = localStorage.getItem("fromCurrency");
    const localToCurrency = localStorage.getItem("toCurrency");
    const localAmount = localStorage.getItem("amount");
    const localAmountFrom = localStorage.getItem("amountFrom");

    localSelectedFromCurrency && setSelectedFrom(localSelectedFromCurrency);
    localSelectedToCurrency && setSelectedTo(localSelectedToCurrency);
    localFromCurrency && setFromCurrency(localFromCurrency);
    localToCurrency && setToCurrency(localToCurrency);
    localAmount && setAmount(parseFloat(localAmount));
    if (localAmountFrom === "true") {
      setAmountFrom(true);
      fromAmount = amount;
    } else if (localAmountFrom === "false") {
      setAmountFrom(false);
      toAmount = amount;
    }

    if (searchParams.has("amountFrom")) {
      if (searchParams.get("amountFrom") === "true") {
        setAmountFrom(true);
        fromAmount = amount;
      } else if (searchParams.get("amountFrom") === "false") {
        setAmountFrom(false);
        console.log(amount);

        toAmount = amount;
      }
    }
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
            startContent={
              <span
                className={`exchangeRate fi ${currencyFlags[fromCurrency]} relative rounded-sm`}
              ></span>
            }
            selectedKeys={[selectedFrom]}
            onSelectionChange={handleChangeFromCurrency}
          >
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
            setSearchParams((searchParams) => {
              searchParams.set("amountFrom", "true");
              return searchParams;
            });
            localStorage.setItem("amount", value);
            localStorage.setItem("amountFrom", "true");
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
            startContent={
              <span
                className={`exchangeRate fi ${currencyFlags[toCurrency]} relative rounded-sm`}
              ></span>
            }
            value={toCurrency}
            selectedKeys={[selectedTo]}
            onSelectionChange={handleChangeToCurrency}
          >
            {currencyOptions.map((option, index) => {
              return (
                <SelectItem
                  className="text-white"
                  key={index}
                  value={option + currencyNames[index]}
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
            setSearchParams((searchParams) => {
              searchParams.set("amountFrom", "false");
              return searchParams;
            });
            localStorage.setItem("amount", value);
            localStorage.setItem("amountFrom", "false");
          }}
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
        />
      </div>
    </div>
  );
}
