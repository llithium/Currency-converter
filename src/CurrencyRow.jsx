import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function CurrencyRow(props) {
  return (
    <div id="currencyRowContainer">
      <div className="optionContainter">
        <label htmlFor="from">From</label>
        <select
          name="from"
          value={props.fromCurrency}
          onChange={props.onChangeFromCurrency}
        >
          {props.currencyOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <CurrencyInput
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
        <label htmlFor="to">To</label>
        <select
          name="to"
          value={props.toCurrency}
          onChange={props.onChangeToCurrency}
        >
          {props.currencyOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <CurrencyInput
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
