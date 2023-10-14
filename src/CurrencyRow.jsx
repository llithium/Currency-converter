import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { height } from "@mui/system";

const flags = [
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

export default function CurrencyRow(props) {
  return (
    <div id="currencyRowContainer">
      <div className="optionContainter">
        {/* <label htmlFor="from">From</label> */}
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
        <CurrencyInput
          style={{
            height: "30.4px",
            fontFamily: "Roboto, 'sans serif' ",
            borderRadius: "6px",
            boxShadow: "0 0 10px 0 rgba(26, 26, 26, 0.1)",
            fontWeight: "600",
          }}
          name="amount"
          value={props.fromAmount}
          onValueChange={(value) => {
            props.onChangeFromAmount(value);
          }}
          intlConfig={props.fromCurrencyFormat}
          allowNegativeValue="false"
        />
      </div>
      <div id="equals">=</div>
      <div className="optionContainter">
        {/* <label htmlFor="to">To</label> */}
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
            name="to"
            className="currencySelect"
            value={props.toCurrency}
            onChange={props.onChangeToCurrency}
            displayEmpty
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <MenuItem
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
        <CurrencyInput
          style={{
            height: "30.4px",
            fontFamily: "Roboto",
            borderRadius: "6px",
            boxShadow: "0 0 10px 0 rgba(26, 26, 26, 0.1)",
            fontWeight: "600",
          }}
          name="amount"
          value={props.toAmount}
          onValueChange={(value) => {
            props.onChangeToAmount(value);
          }}
          intlConfig={props.toCurrencyFormat}
          allowNegativeValue="false"
        />
      </div>
    </div>
  );
}
