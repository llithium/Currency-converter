import { Button, ButtonGroup, Select, SelectItem } from "@nextui-org/react";
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

function getEarlierDates() {
  const now: Date = new Date();

  // 1 week earlier
  const oneWeekEarlier: Date = new Date(now);
  oneWeekEarlier.setDate(oneWeekEarlier.getDate() - 7);

  // 1 month earlier
  const oneMonthEarlier: Date = new Date(now);
  oneMonthEarlier.setMonth(oneMonthEarlier.getMonth() - 1);

  // 1 year earlier
  const oneYearEarlier: Date = new Date(now);
  oneYearEarlier.setFullYear(oneYearEarlier.getFullYear() - 1);

  // 5 years earlier
  const fiveYearsEarlier: Date = new Date(now);
  fiveYearsEarlier.setFullYear(fiveYearsEarlier.getFullYear() - 5);

  // 10 years earlier
  const tenYearsEarlier: Date = new Date(now);
  tenYearsEarlier.setFullYear(tenYearsEarlier.getFullYear() - 10);

  const oneWeek = oneWeekEarlier
    .toLocaleString("lt", {
      dateStyle: "short",
    })
    .replace(/\//g, "-");
  const oneMonth = oneMonthEarlier
    .toLocaleString("lt", {
      dateStyle: "short",
    })
    .replace(/\//g, "-");
  const oneYear = oneYearEarlier
    .toLocaleString("lt", {
      dateStyle: "short",
    })
    .replace(/\//g, "-");
  const fiveYears = fiveYearsEarlier
    .toLocaleString("lt", {
      dateStyle: "short",
    })
    .replace(/\//g, "-");
  const tenYears = tenYearsEarlier
    .toLocaleString("lt", {
      dateStyle: "short",
    })
    .replace(/\//g, "-");
  return { oneWeek, oneMonth, oneYear, fiveYears, tenYears };
}

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
  const [date, setDate] = useState("");

  useEffect(() => {
    let { oneMonth } = getEarlierDates();
    setDate(oneMonth);
  }, []);

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await axios.get(
          apiURL + `/${date}..?from=${fromCurrency}&to=${toCurrency}`,
        );
        const responseData: HistoryResponse = response.data;
        const rates = responseData.rates;
        const newData: DataObject[] = [];
        if (rates) {
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
        <div className="optionContainter mb-6 lg:mb-0 lg:mr-3">
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
        <div className="optionContainter  lg:ml-3">
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
      <div id="buttonContainer" className=" mx-auto ">
        <ButtonGroup className="w-80">
          <Button
            className=" my-6 w-full  min-w-12  px-4 py-2"
            onClick={() => {
              const { oneWeek } = getEarlierDates();
              setDate(oneWeek);
            }}
          >
            1W
          </Button>
          <Button
            className="my-6  w-full min-w-12 px-4 py-2"
            onClick={() => {
              const { oneMonth } = getEarlierDates();
              setDate(oneMonth);
            }}
          >
            1M
          </Button>
          <Button
            className="my-6 w-full  min-w-12  px-4 py-2"
            onClick={() => {
              const { oneYear } = getEarlierDates();
              setDate(oneYear);
            }}
          >
            1Y
          </Button>
          <Button
            className="my-6 w-full  min-w-12  px-4 py-2"
            onClick={() => {
              const { fiveYears } = getEarlierDates();
              setDate(fiveYears);
            }}
          >
            5Y
          </Button>
          <Button
            className="my-6 w-full  min-w-12  px-4 py-2"
            onClick={() => {
              const { tenYears } = getEarlierDates();
              setDate(tenYears);
            }}
          >
            10Y
          </Button>
          <Button
            className="my-6 w-full  min-w-12  px-4 py-2"
            onClick={() => {
              setDate("1999-01-04");
            }}
          >
            All
          </Button>
        </ButtonGroup>
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
