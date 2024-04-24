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
    <div id="currencyRowContainer" className="xl:flex xl:flex-row">
      <div className="optionContainter mb-6 lg:mr-3">
        <div>
          <Select
            label="From"
            name="from"
            className="max-w-xs text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900",
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
        <CurrencyInput
          className="h-14 w-80 rounded-xl px-3 text-small text-foreground"
          name="amount"
          value={props.fromAmount}
          onValueChange={(value) => {
            props.onChangeFromAmount(value);
          }}
          intlConfig={props.fromCurrencyFormat}
          allowNegativeValue="false"
        />
      </div>
      <div className="optionContainter lg:ml-3">
        <div>
          <Select
            label="To"
            name="to"
            className="max-w-xs text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900",
            }}
            value={props.toCurrency}
            selectedKeys={[props.selectedTo]}
            onSelectionChange={props.onChangeToCurrency}
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
        <CurrencyInput
          className="h-14 w-80 rounded-xl px-3 text-small text-foreground"
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
