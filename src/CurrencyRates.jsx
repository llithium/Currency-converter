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
                <span className="exchangeRate">
                  {props.viewExchangeRates[0][index]}
                </span>
                {option}
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
