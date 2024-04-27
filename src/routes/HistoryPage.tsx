import { Button, ButtonGroup, Select, SelectItem } from "@nextui-org/react";
import { apiURL, flags } from "./ConversionPage";
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
angeToAmount: Function;

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

export default function HistoryPage() {
  const [histoyData, setHistoryData] = useState<DataObject[]>([]);
  const [date, setDate] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
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
        selectedRange === "" && setSelectedRange("1M");
      } catch (error) {
        console.log(error);
      }
    }
    getHistory();
  }, [fromCurrency, toCurrency, date]);

  return (
    <>
      <div id="currencyRowContainer" className="xl:flex xl:flex-row">
        <div className="optionContainter mb-6 xl:mb-0 xl:mr-3">
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
        <div className="optionContainter  xl:ml-3">
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
            className={`my-6 w-full min-w-12  px-4 py-2 ${selectedRange === "1W" ? "dark:bg-pink-950" : "dark:bg-stone-950  dark:hover:bg-zinc-800/60"}`}
            onClick={() => {
              const { oneWeek } = getEarlierDates();
              setDate(oneWeek);
              setSelectedRange("1W");
            }}
          >
            1W
          </Button>
          <Button
            className={`my-6 w-full min-w-12  px-4 py-2 ${selectedRange === "1M" ? "dark:bg-pink-950" : "dark:bg-stone-950  dark:hover:bg-zinc-800/60"}`}
            onClick={() => {
              const { oneMonth } = getEarlierDates();
              setDate(oneMonth);
              setSelectedRange("1M");
            }}
          >
            1M
          </Button>
          <Button
            className={`my-6 w-full min-w-12  px-4 py-2 ${selectedRange === "1Y" ? "dark:bg-pink-950" : "dark:bg-stone-950  dark:hover:bg-zinc-800/60"}`}
            onClick={() => {
              const { oneYear } = getEarlierDates();
              setDate(oneYear);
              setSelectedRange("1Y");
            }}
          >
            1Y
          </Button>
          <Button
            className={`my-6 w-full min-w-12  px-4 py-2 ${selectedRange === "5Y" ? "dark:bg-pink-950" : "dark:bg-stone-950  dark:hover:bg-zinc-800/60"}`}
            onClick={() => {
              const { fiveYears } = getEarlierDates();
              setDate(fiveYears);
              setSelectedRange("5Y");
            }}
          >
            5Y
          </Button>
          <Button
            className={`my-6 w-full min-w-12  px-4 py-2 ${selectedRange === "10Y" ? "dark:bg-pink-950" : "dark:bg-stone-950  dark:hover:bg-zinc-800/60"}`}
            onClick={() => {
              const { tenYears } = getEarlierDates();
              setDate(tenYears);
              setSelectedRange("10Y");
            }}
          >
            10Y
          </Button>
          <Button
            className={`my-6 w-full min-w-12  px-4 py-2 ${selectedRange === "All" ? "dark:bg-pink-950" : "dark:bg-stone-950  dark:hover:bg-zinc-800/60"}`}
            onClick={() => {
              setDate("1999-01-04");
              setSelectedRange("All");
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
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0c0a09",
                border: "0px",
                borderRadius: "12px",
              }}
              wrapperStyle={{
                color: "#ffffff",
              }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#be185d"
              fill="#be185d"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
