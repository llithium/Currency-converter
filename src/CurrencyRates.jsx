import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { flags } from "./CurrencyRow";

export default function CurrencyRates(props) {
  return (
    <div id="currencyRatesContainer">
      <div id="rateOptionContainer" className="optionContainter">
        <FormControl
          size="small"
          sx={{
            m: 0.2,
            minWidth: 120,
            width: 209,
            "& .MuiSvgIcon-root": {
              color: "rgba(255, 255, 255, 0.87)",
            },
          }}
        >
          <Select
            sx={{
              color: "rgba(255, 255, 255, 0.87)",
              borderColor: "rgba(255, 255, 255, 0.87)",
              borderRadius: "6px",
              backgroundColor: "#212121",
              textAlign: "left",
              boxShadow: "0 0 10px 0 rgba(26, 26, 26, 0.1)",
            }}
            inputProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#212121",
                  },
                },
              },
            }}
            name="from"
            className="fromSelect"
            value={props.fromCurrency}
            onChange={props.onChangeFromCurrency}
            displayEmpty
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  value={option}
                  sx={{
                    color: "rgba(255, 255, 255, 0.87)",
                  }}
                >
                  <span className={`fi ${flags[index]}`}></span>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div id="equalsRates" className="equals">
        =
      </div>
      <div className="ratesOptionContainter">
        <ul>
          {props.viewExchangeRatesOptions[0].map((option, index) => {
            return (
              <li className="ratesList" key={index}>
                {props.viewExchangeRates[0][index]} {option}
                <span
                  className={`exchangeRate fi ${currencyToFlag(option)}`}
                ></span>
                {/* TODO: Fix flags in rates viewer */}
                {/* <span className={`fi ${flags[index]}`}></span> */}
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
