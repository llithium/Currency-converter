import React from "react";

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
        <input name="amount" type="number"></input>
      </div>
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
        <input name="amount" type="number"></input>
      </div>
    </div>
  );
}
