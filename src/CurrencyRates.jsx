import React from "react";
import { flags } from "./CurrencyRow";
import { Select, SelectItem } from "@nextui-org/react";

export default function CurrencyRates(props) {
  return (
    // ? Change to h-4/5 if issues on mobile
    <div
      className="h-5/6 w-fit lg:flex lg:flex-row"
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
            selectedKeys={[props.selectedFrom]}
            onSelectionChange={props.onChangeFromCurrency}
          >
            {props.currencyOptions.map((option, index) => {
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
          {props.viewExchangeRatesOptions[0].map((option, index) => {
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
                }).format(props.viewExchangeRates[0][index])}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function currencyToFlag(country) {
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
