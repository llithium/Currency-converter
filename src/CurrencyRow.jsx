import React from "react";

export default function CurrencyRow(props) {
  const { currencyOptions } = props;
  return (
    <div id="currencyRowContainer">
      <div className="optionContainter">
        <label htmlFor="amount">Amount</label>
        <input name="amount" type="number"></input>
      </div>
      <div className="optionContainter">
        <label htmlFor="from">From</label>
        <select name="from">
          {currencyOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div className="optionContainter">
        <label htmlFor="to">To</label>
        <select name="to">
          {currencyOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
