import { Input, Select, SelectItem } from "@nextui-org/react";
import getSymbolFromCurrency from "currency-symbol-map";

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

export interface SelectKeys {
  0: string;
  anchorKey: string;
  currentKey: string;
}

interface CurrencyRatesProps {
  currencyOptions: string[];
  fromCurrency: string;
  toCurrency: string;
  selectedFrom: string;
  selectedTo: string;
  onChangeFromCurrency: Function;
  onChangeToCurrency: Function;
  fromAmount: number | null;
  toAmount: number | null;
  onChangeFromAmount: Function;
  onChangeToAmount: Function;
  fromCurrencyFormat: {
    locale: string;
    currency: string;
  };
  toCurrencyFormat: {
    locale: string;
    currency: string;
  };
}

export default function CurrencyRow(props: CurrencyRatesProps) {
  return (
    <div id="currencyRowContainer" className="xl:flex xl:flex-row">
      <div className="optionContainter mb-6 xl:mr-3">
        <div>
          <Select
            label="From"
            name="from"
            className="max-w-xs text-foreground"
            classNames={{
              popoverContent: "bg-zinc-900",
            }}
            selectedKeys={[props.selectedFrom]}
            onSelectionChange={(keys) => props.onChangeFromCurrency(keys)}
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
        <Input
          className=""
          classNames={{
            inputWrapper:
              "dark:hover:bg-zinc-800/60 dark:bg-stone-950 h-14 w-80 rounded-xl dark:focus-within:bg-stone-950/60",
          }}
          startContent={<div>{getSymbolFromCurrency(props.fromCurrency)}</div>}
          value={props.fromAmount ? props.fromAmount.toString() : ""}
          onValueChange={(value) => {
            props.onChangeFromAmount(value);
          }}
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
        />
      </div>
      <div className="optionContainter xl:ml-3">
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
            onSelectionChange={(keys) => props.onChangeToCurrency(keys)}
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
        <Input
          className=""
          classNames={{
            inputWrapper:
              "dark:hover:bg-zinc-800/60 dark:bg-stone-950 h-14 w-80 rounded-xl dark:focus-within:bg-stone-950/60",
          }}
          startContent={<div>{getSymbolFromCurrency(props.toCurrency)}</div>}
          value={props.toAmount ? props.toAmount.toString() : ""}
          onValueChange={(value) => {
            props.onChangeToAmount(value);
          }}
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
        />
      </div>
    </div>
  );
}
