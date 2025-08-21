import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress } from "@mui/material";

function SetCurrencyData({
  symbols,
  toCurrency,
  setToCurrency,
  Item,
  convertCurrency,
}) {
  return (
    <Item sx={{ p: 2 }}>
      {symbols && Object.keys(symbols).length > 0 ? (
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          helperText="Convert To This Currency"
          FormHelperTextProps={{
            sx: {
              textAlign: "center",
              width: "100%",
              display: "block",
              color: "rgba(255, 255, 255, 0.6)",
              padding: "8px 0",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: "0.02857em",
            },
          }}
          fullWidth
          sx={{
            label: { color: "rgba(255, 255, 255, 0.7)" },
            ".MuiOutlinedInput-root": {
              color: "white", // sets text color
              backgroundColor: "#1e1e1e", // optional: input background
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#90caf9",
              },
            },
            ".MuiSelect-select": {
              color: "white", // selected text color
              backgroundColor: "#1e1e1e", // optional: selected input background
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            ".MuiSelect-icon": {
              color: "white",
            },
            "& .MuiFormHelperText-root": {
              color: "rgba(255,255,255,0.6)",
            },
          }}
        >
          {symbols &&
            Object.entries(symbols)
              .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
              .map(([key, item]) => (
                <MenuItem key={key} value={key}>
                  <img
                    src={`https://currencyfreaks.com/photos/flags/${convertCurrency(
                      key
                    )}.webp`}
                    alt={`${key} flag`}
                    style={{ width: 30, height: 30, marginRight: 8 }}
                  />
                  {key} - {item}
                </MenuItem>
              ))}
        </TextField>
      ) : (
        <CircularProgress sx={{ color: "#7affae" }}></CircularProgress>
      )}
    </Item>
  );
}

export default SetCurrencyData;
