import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { flags } from "./CurrencyRow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function CurrencyRates(props) {
  return (
    <div id="currencyRatesContainer">
      <div className="optionContainter">
        <FormControl
          size="small"
          sx={{
            m: 0.2,
            minWidth: 120,
            width: 209,
            "& .MuiSvgIcon-root": {
              color: "rgba(255, 255, 255, 0.87)",
            },
          }}
        >
          <Select
            sx={{
              color: "rgba(255, 255, 255, 0.87)",
              borderColor: "rgba(255, 255, 255, 0.87)",
              borderRadius: "6px",
              backgroundColor: "#212121",
              textAlign: "left",
              boxShadow: "0 0 10px 0 rgba(26, 26, 26, 0.1)",
            }}
            inputProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: "#212121",
                  },
                },
              },
            }}
            name="from"
            className="fromSelect"
            value={props.fromCurrency}
            onChange={props.onChangeFromCurrency}
            displayEmpty
          >
            {props.currencyOptions.map((option, index) => {
              return (
                <MenuItem
                  value={option}
                  sx={{
                    color: "rgba(255, 255, 255, 0.87)",
                  }}
                >
                  <span className={`fi ${flags[index]}`}></span>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="ratesOptionContainter">
        <ul>
          {props.viewExchangeRatesOptions[0].map((option, index) => {
            return (
              <li>
                <span>{props.viewExchangeRates[0][index]}</span>
                <span className={`fi ${flags[index]}`}></span>
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
