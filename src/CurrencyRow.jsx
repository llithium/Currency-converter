import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

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

export default function CurrencyRow(props) {
  return (
    <div id="currencyRowContainer">
      <div className="optionContainter">
        <div>
          <Select
            name="from"
            className="max-w-xs"
            value={props.fromCurrency}
            onChange={props.onChangeFromCurrency}
            displayEmpty
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <SelectItem key={index} value={option}>
                  <span className={`fi ${flags[index]}`}></span>
                  {option}
                </SelectItem>
              );
            })}
          </Select>
        </div>
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
      <div className="equals">=</div>
      <div className="optionContainter">
        <div
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
            name="to"
            className="max-w-xs"
            value={props.toCurrency}
            onChange={props.onChangeToCurrency}
            displayEmpty
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <SelectItem key={index} value={option}>
                  <span className={`fi ${flags[index]}`}></span>
                  {option}
                </SelectItem>
              );
            })}
          </Select>
        </div>
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
