import { useEffect, useState } from "react";
import { LoaderData, SelectKeys, apiURL, flags } from "./ConversionPage";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";

export default function RatesPage() {
  const { currencyOptions } = useLoaderData() as LoaderData;
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [selectedFrom, setSelectedFrom] = useState("9");
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
    localSelectedFromCurrency && setSelectedFrom(localSelectedFromCurrency);
    localFromCurrency && setFromCurrency(localFromCurrency);
    if (searchParams.has("from")) {
      setSelectedFrom(searchParams.get("from") as string);
      const from = parseInt(searchParams.get("from") as string);
      setFromCurrency(currencyOptions[from]);
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
            selectedKeys={[selectedFrom]}
            onSelectionChange={handleChangeFromCurrency}
          >
            {/* ? Consider adding full currency names from /currencies endpoint */}
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
      </div>

      <div className="ratesOptionContainter h-full max-h-full w-80 rounded-lg lg:ml-3">
        <ul className="h-full overflow-auto rounded-lg">
          {viewExchangeRatesOptions.map((option, index) => {
            return (
              <li
                className="ratesList border-b border-zinc-900/60 bg-zinc-800 px-4 py-1 font-semibold text-foreground lg:py-3"
                key={index}
              >
                {" "}
                <span
                  className={`exchangeRate fi ${currencyToFlag(option)} mr-2  rounded-sm`}
                ></span>
                {new Intl.NumberFormat(navigator.language, {
                  style: "currency",
                  currency: option,
                }).format(viewExchangeRates[index])}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function currencyToFlag(country: string) {
  switch (country) {
    case "AUD":
      return "fi-au";
      break;
    case "BGN":
      return "fi-bg";
      break;
    case "BRL":
      return "fi-br";
      break;
    case "CAD":
      return "fi-ca";
      break;
    case "CHF":
      return "fi-ch";
      break;
    case "CNY":
      return "fi-cn";
      break;
    case "CZK":
      return "fi-cz";
      break;
    case "DKK":
      return "fi-dk";
      break;
    case "GBP":
      return "fi-gb";
      break;
    case "EUR":
      return "fi-eu";
      break;
    case "HKD":
      return "fi-hk";
      break;
    case "HUF":
      return "fi-hu";
      break;
    case "IDR":
      return "fi-id";
      break;
    case "ILS":
      return "fi-il";
      break;
    case "INR":
      return "fi-in";
      break;
    case "ISK":
      return "fi-is";
      break;
    case "JPY":
      return "fi-jp";
      break;
    case "KRW":
      return "fi-kr";
      break;
    case "MXN":
      return "fi-mx";
      break;
    case "MYR":
      return "fi-my";
      break;
    case "NOK":
      return "fi-no";
      break;
    case "NZD":
      return "fi-nz";
      break;
    case "PHP":
      return "fi-ph";
      break;
    case "PLN":
      return "fi-pl";
      break;
    case "RON":
      return "fi-ro";
      break;
    case "SEK":
      return "fi-se";
      break;
    case "SGD":
      return "fi-sg";
      break;
    case "THB":
      return "fi-th";
      break;
    case "TRY":
      return "fi-tr";
      break;
    case "USD":
      return "fi-us";
      break;
    case "ZAR":
      return "fi-za";
      break;

    default:
      break;
  }
}
