import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import { LoaderData, apiURL } from "./ConversionPage";
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
import axios, { AxiosResponse } from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { currencyFlags } from "../utils/currencyFlags";

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
  const { currencyOptions, currencyNames } = useLoaderData() as LoaderData;
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [historyData, setHistoryData] = useState<DataObject[]>([]);
  const [date, setDate] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("8");
  const [selectedTo, setSelectedTo] = useState("29");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      let { oneMonth } = getEarlierDates();
      setDate(oneMonth);

      const localSelectedFromCurrency = localStorage.getItem(
        "selectedFromCurrency",
      );
      const localSelectedToCurrency =
        localStorage.getItem("selectedToCurrency");
      const localFromCurrency = localStorage.getItem("fromCurrency");
      const localToCurrency = localStorage.getItem("toCurrency");

      localSelectedFromCurrency && setSelectedFrom(localSelectedFromCurrency);
      localSelectedToCurrency && setSelectedTo(localSelectedToCurrency);
      localFromCurrency && setFromCurrency(localFromCurrency);
      localToCurrency && setToCurrency(localToCurrency);

      if (searchParams.has("from")) {
        setSelectedFrom(searchParams.get("from") as string);
        const from = parseInt(searchParams.get("from") as string);
        setFromCurrency(currencyOptions[from]);
      }
      if (searchParams.has("to")) {
        setSelectedTo(searchParams.get("to") as string);
        const to = parseInt(searchParams.get("to") as string);
        setToCurrency(currencyOptions[to]);
      }
      if (searchParams.has("range")) {
        setSelectedRange(searchParams.get("range") as string);
        const { oneWeek, oneMonth, oneYear, fiveYears, tenYears } =
          getEarlierDates();
        switch (searchParams.get("range") as string) {
          case "1W":
            setDate(oneWeek);
            break;
          case "1M":
            setDate(oneMonth);
            break;
          case "1Y":
            setDate(oneYear);
            break;
          case "5Y":
            setDate(fiveYears);
            break;
          case "10Y":
            setDate(tenYears);
            break;
          case "All":
            setDate("1999-01-04");
            break;
          default:
            break;
        }
      }
    }

    async function getHistory() {
      try {
        const response = await axios.get(
          apiURL + `/${date}..?from=${fromCurrency}&to=${toCurrency}`,
        );
        const newData: DataObject[] = convertData(response);
        setHistoryData(newData);
        setIsLoading(false);
        selectedRange === "" && setSelectedRange("1M");
      } catch (error) {}
    }
    getHistory();
  }, [fromCurrency, toCurrency, date]);

  function convertData(response: AxiosResponse): DataObject[] {
    const newData: DataObject[] = [];
    const responseData: HistoryResponse = response.data;
    const rates = responseData.rates;

    for (const [key] of Object.entries(rates)) {
      const dataPoint = [];
      const datePair = [];
      const ratePair = [];
      datePair.push("Date");
      datePair.push(key);
      ratePair.push("Rate");
      ratePair.push(rates[key][toCurrency]);
      dataPoint.push(datePair, ratePair);
      const dataObject: DataObject = Object.fromEntries(dataPoint);
      newData.push(dataObject);
    }
    return newData;
  }

  function handleChangeFromCurrency<Selection>(key: Selection): any {
    const newKey = key as string;
    const value = currencyOptions[parseFloat(newKey)];

    if (value) {
      if (value !== toCurrency) {
        setFromCurrency(value);
        localStorage.setItem("fromCurrency", value);
        setSearchParams((searchParams) => {
          searchParams.set("from", newKey);
          return searchParams;
        });
        setSelectedFrom(newKey);
        localStorage.setItem("selectedFromCurrency", newKey);
      } else {
        setToCurrency(fromCurrency);
        setSearchParams((searchParams) => {
          searchParams.set(
            "to",
            currencyOptions.indexOf(fromCurrency).toString(),
          );
          return searchParams;
        });
        localStorage.setItem("toCurrency", fromCurrency);
        setSelectedTo(currencyOptions.indexOf(fromCurrency).toString());
        localStorage.setItem(
          "selectedToCurrency",
          currencyOptions.indexOf(fromCurrency).toString(),
        );

        setFromCurrency(toCurrency);
        setSearchParams((searchParams) => {
          searchParams.set(
            "from",
            currencyOptions.indexOf(toCurrency).toString(),
          );
          return searchParams;
        });
        localStorage.setItem("fromCurrency", toCurrency);
        setSelectedFrom(currencyOptions.indexOf(toCurrency).toString());
        localStorage.setItem(
          "selectedFromCurrency",
          currencyOptions.indexOf(toCurrency).toString(),
        );
      }
    } else {
    }
  }

  function handleChangeToCurrency<Selection>(key: Selection): any {
    const newKey = key as string;
    const value = currencyOptions[parseInt(newKey)];
    console.log();

    if (value) {
      if (value !== fromCurrency) {
        setToCurrency(value);
        setSearchParams((searchParams) => {
          searchParams.set("to", newKey);
          return searchParams;
        });
        localStorage.setItem("toCurrency", value);
        setSelectedTo(newKey);
        localStorage.setItem("selectedToCurrency", newKey);
      } else {
        setToCurrency(fromCurrency);

        setSelectedTo(currencyOptions.indexOf(fromCurrency).toString());
        setSearchParams((searchParams) => {
          searchParams.set(
            "to",
            currencyOptions.indexOf(fromCurrency).toString(),
          );
          return searchParams;
        });
        localStorage.setItem(
          "selectedToCurrency",
          currencyOptions.indexOf(fromCurrency).toString(),
        );
        setFromCurrency(toCurrency);
        setSearchParams((searchParams) => {
          searchParams.set(
            "from",
            currencyOptions.indexOf(toCurrency).toString(),
          );
          return searchParams;
        });
        localStorage.setItem("fromCurrency", toCurrency);
        setSelectedFrom(currencyOptions.indexOf(toCurrency).toString());
        localStorage.setItem(
          "selectedFromCurrency",
          currencyOptions.indexOf(toCurrency).toString(),
        );
      }
    } else {
    }
  }

  return (
    <>
      <div className="flex h-[calc(100svh-120px)] flex-col items-center">
        <div className="mx-auto w-fit xl:flex xl:flex-row">
          <div className="optionContainer mb-6 xl:mb-0 xl:mr-3">
            <div>
              <Autocomplete
                label="From"
                name="from"
                className="w-80 max-w-xs text-lg text-foreground"
                classNames={{
                  popoverContent: "bg-zinc-900",
                }}
                startContent={
                  <span
                    className={`exchangeRate fi ${currencyFlags[fromCurrency]} relative rounded-sm`}
                  ></span>
                }
                selectedKey={selectedFrom}
                onSelectionChange={handleChangeFromCurrency}
              >
                {currencyOptions.map((option, index) => {
                  return (
                    <AutocompleteItem
                      className="text-white"
                      key={index}
                      value={option + " - " + currencyNames[index]}
                      startContent={
                        <span
                          className={`fi ${currencyFlags[option]} rounded-sm`}
                        ></span>
                      }
                    >
                      {option + " - " + currencyNames[index]}
                    </AutocompleteItem>
                  );
                })}
              </Autocomplete>
            </div>
          </div>
          <div className="optionContainer xl:ml-3">
            <div>
              <Autocomplete
                label="To"
                name="to"
                className="w-80 max-w-xs text-lg text-foreground"
                classNames={{
                  popoverContent: "bg-zinc-900",
                }}
                startContent={
                  <span
                    className={`exchangeRate fi ${currencyFlags[toCurrency]} relative rounded-sm`}
                  ></span>
                }
                value={toCurrency}
                selectedKey={selectedTo}
                onSelectionChange={handleChangeToCurrency}
              >
                {currencyOptions.map((option, index) => {
                  return (
                    <AutocompleteItem
                      className="text-white"
                      key={index}
                      value={option + " - " + currencyNames[index]}
                      startContent={
                        <span
                          className={`fi ${currencyFlags[option]} rounded-sm`}
                        ></span>
                      }
                    >
                      {option + " - " + currencyNames[index]}
                    </AutocompleteItem>
                  );
                })}
              </Autocomplete>
            </div>
          </div>
        </div>
        <div id="buttonContainer" className="mx-auto w-fit">
          <ButtonGroup className="w-80">
            <Button
              className={`my-6 w-full min-w-12 px-4 py-2 text-medium ${selectedRange === "1W" ? "dark:bg-pink-950" : "dark:bg-stone-950 dark:hover:bg-zinc-800/60"}`}
              onClick={() => {
                const { oneWeek } = getEarlierDates();
                setDate(oneWeek);
                setSelectedRange("1W");
                setSearchParams((searchParams) => {
                  searchParams.set("range", "1W");
                  return searchParams;
                });
              }}
            >
              1W
            </Button>
            <Button
              className={`my-6 w-full min-w-12 px-4 py-2 text-medium ${selectedRange === "1M" ? "dark:bg-pink-950" : "dark:bg-stone-950 dark:hover:bg-zinc-800/60"}`}
              onClick={() => {
                const { oneMonth } = getEarlierDates();
                setDate(oneMonth);
                setSelectedRange("1M");
                setSearchParams((searchParams) => {
                  searchParams.set("range", "1M");
                  return searchParams;
                });
              }}
            >
              1M
            </Button>
            <Button
              className={`my-6 w-full min-w-12 px-4 py-2 text-medium ${selectedRange === "1Y" ? "dark:bg-pink-950" : "dark:bg-stone-950 dark:hover:bg-zinc-800/60"}`}
              onClick={() => {
                const { oneYear } = getEarlierDates();
                setDate(oneYear);
                setSelectedRange("1Y");
                setSearchParams((searchParams) => {
                  searchParams.set("range", "1Y");
                  return searchParams;
                });
              }}
            >
              1Y
            </Button>
            <Button
              className={`my-6 w-full min-w-12 px-4 py-2 text-medium ${selectedRange === "5Y" ? "dark:bg-pink-950" : "dark:bg-stone-950 dark:hover:bg-zinc-800/60"}`}
              onClick={() => {
                const { fiveYears } = getEarlierDates();
                setDate(fiveYears);
                setSelectedRange("5Y");
                setSearchParams((searchParams) => {
                  searchParams.set("range", "5Y");
                  return searchParams;
                });
              }}
            >
              5Y
            </Button>
            <Button
              className={`my-6 w-full min-w-12 px-4 py-2 text-medium ${selectedRange === "10Y" ? "dark:bg-pink-950" : "dark:bg-stone-950 dark:hover:bg-zinc-800/60"}`}
              onClick={() => {
                const { tenYears } = getEarlierDates();
                setDate(tenYears);
                setSelectedRange("10Y");
                setSearchParams((searchParams) => {
                  searchParams.set("range", "10Y");
                  return searchParams;
                });
              }}
            >
              10Y
            </Button>
            <Button
              className={`my-6 w-full min-w-12 px-4 py-2 text-medium ${selectedRange === "All" ? "dark:bg-pink-950" : "dark:bg-stone-950 dark:hover:bg-zinc-800/60"}`}
              onClick={() => {
                setDate("1999-01-04");
                setSelectedRange("All");
                setSearchParams((searchParams) => {
                  searchParams.set("range", "All");
                  return searchParams;
                });
              }}
            >
              All
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          {!isLoading && (
            <ResponsiveContainer>
              <AreaChart
                data={historyData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid stroke="#27272a" vertical={false} />
                <XAxis
                  dataKey="Date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={"preserveStartEnd"}
                  tick={{ fill: "#f8f8f8" }}
                  minTickGap={6}
                />
                <YAxis
                  type="number"
                  scale={"auto"}
                  tickCount={8}
                  // domain={[
                  //   (dataMin: number) => Math.max(0, dataMin * 0.95),
                  //   (dataMax: number) => dataMax * 1.02,
                  // ]}
                  domain={["auto", "auto"]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "#f8f8f8" }}
                  // interval={"preserveStartEnd"}
                  tickFormatter={(value: number) => value.toFixed(2)}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#0c0a09",
                    border: "0px",
                    borderRadius: "12px",
                  }}
                  wrapperStyle={{
                    color: "#f8f8f8",
                  }}
                />
                <Area
                  type="linear"
                  dataKey="Rate"
                  stroke="#be185d"
                  fill="#be185d"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
}
