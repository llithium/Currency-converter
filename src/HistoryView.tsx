import { Select, SelectItem } from "@nextui-org/react";
import { flags } from "./CurrencyRow";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { apiURL } from "./App";
import axios from "axios";

interface HistoryResponse {
  amount: number;
  base: string;
  start_date: Date;
  end_date: Date;
  rates: { [key: string]: Rate };
}

interface Rate {
  [key: string]: number;
}

interface HistoryViewProps {
  currencyOptions: string[];
  fromCurrency: string;
  toCurrency: string;
  selectedFrom: string;
  selectedTo: string;
  onChangeFromCurrency: Function;
  onChangeToCurrency: Function;
  onChangeFromAmount: Function;
  onChangeToAmount: Function;
}

interface DataObject {
  date: string;
  rate: number;
}
const date = "2023-01-01";

export default function HistoryView({
  selectedFrom,
  selectedTo,
  currencyOptions,
  onChangeFromCurrency,
  onChangeToCurrency,
  toCurrency,
  fromCurrency,
}: HistoryViewProps) {
  const [histoyData, setHistoryData] = useState<DataObject[]>([]);

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await axios.get(
          apiURL + `/${date}..?from=${fromCurrency}&to=${toCurrency}`,
        );
        const responseData: HistoryResponse = response.data;
        const rates = responseData.rates;
        const newData: DataObject[] = [];
        for (const [key] of Object.entries(rates)) {
          const dataPoint = [];
          const datePair = [];
          const ratePair = [];
          datePair.push("date");
          datePair.push(key);
          ratePair.push("rate");
          ratePair.push(rates[key][toCurrency]);
          dataPoint.push(datePair, ratePair);
          const dataObject: DataObject = Object.fromEntries(dataPoint);
          newData.push(dataObject);
        }
        setHistoryData(newData);
      } catch (error) {
        console.log(error);
      }
    }
    getHistory();
  }, [fromCurrency, toCurrency, date]);

  return (
    <>
      <div id="currencyRowContainer" className="xl:flex xl:flex-row">
        <div className="optionContainter mb-6 lg:mr-3">
          <div>
            <Select
              label="From"
              name="from"
              className="w-80 max-w-xs text-foreground"
              classNames={{
                popoverContent: "bg-zinc-900",
              }}
              selectedKeys={[selectedFrom]}
              onSelectionChange={(keys) => onChangeFromCurrency(keys)}
            >
              {currencyOptions.map((option, index) => {
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
        </div>
        <div className="optionContainter lg:ml-3">
          <div>
            <Select
              label="To"
              name="to"
              className="w-80 max-w-xs text-foreground"
              classNames={{
                popoverContent: "bg-zinc-900",
              }}
              value={toCurrency}
              selectedKeys={[selectedTo]}
              onSelectionChange={(keys) => onChangeToCurrency(keys)}
            >
              {currencyOptions.map((option, index) => {
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
        </div>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer>
          <AreaChart
            data={histoyData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
