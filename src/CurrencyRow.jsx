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
  // {
  //   console.log(props.currencyOptions);
  // }
  return (
    <div id="currencyRowContainer">
      <div className="optionContainter">
        <div>
          <Select
            label="Select Currency"
            name="from"
            className="max-w-xs"
            selectedKeys={[props.selectedFrom]}
            onSelectionChange={props.onChangeFromCurrency}
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <SelectItem
                  key={index}
                  value={option}
                  startContent={
                    <span className={`fi ${flags[index]} rounded-sm`}></span>
                  }
                >
                  {/* <span className={`fi ${flags[index]}`}></span> */}
                  {option}
                </SelectItem>
              );
            })}
          </Select>
        </div>
        <CurrencyInput
          className="h-14 w-80 rounded-xl text-foreground"
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
        <div>
          <Select
            label="Select Currency"
            name="to"
            className="max-w-xs"
            value={props.toCurrency}
            selectedKeys={[props.selectedTo]}
            onSelectionChange={props.onChangeToCurrency}
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <SelectItem
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
        <CurrencyInput
          className="h-14 w-80 rounded-xl text-foreground"
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
