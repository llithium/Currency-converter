import React from "react";

export default function CurrencyRow() {
  return (
    <div id="currencyRowContainer">
      <div className="optionContainter">
        <label for="amount">Amount</label>
        <input name="amount" type="number"></input>
      </div>
      <div className="optionContainter">
        <label for="from">From</label>
        <select name="from">
          <option></option>
        </select>
      </div>
      <div className="optionContainter">
        <label for="to">To</label>
        <select name="to">
          <option></option>
        </select>
      </div>
    </div>
  );
}
