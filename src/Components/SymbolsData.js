import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CurrencyFlagImage from "react-currency-flags";
import { Icon } from "@iconify/react";

function SymbolsFetch({
  symbols,
  setSymbols,
  fromCurrency,
  setFromCurrency,
  Item,
  convertCurrency,
}) {
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await axios.get(
          "https://api.currencyfreaks.com/v2.0/currency-symbols",
          {
            params: {
              access_key: "d5f6f53d5ced41f49e2725d30b664586",
            },
          }
        );
        setSymbols(res.data.currencySymbols);
      } catch (error) {
        console.error("Failed to load currency symbols:", error.message);
      }
    };

    fetchSymbols();
  }, [setSymbols]);

  return (
    <Item fromCurrentCurrent={fromCurrency} symbolData={symbols} sx={{ p: 2 }}>
      {symbols && Object.keys(symbols).length > 0 ? (
        <TextField
          onChange={(e) => setFromCurrency(e.target.value)}
          id="outlined-select-currency"
          select
          label="Select"
          value={fromCurrency}
          helperText="Please select your currency"
          fullWidth
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
          sx={{
            label: { color: "rgba(255, 255, 255, 0.7)" },
            ".MuiOutlinedInput-root": {
              color: "white",
              backgroundColor: "#1e1e1e",
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
              color: "white",
              backgroundColor: "#1e1e1e",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            },
            ".MuiSelect-icon": {
              color: "white",
            },
            "& .MuiFormHelperText-root": {
              color: "rgba(255,255,255,0.6)",
            },
          }}
        >
          {Object.entries(symbols)
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
            .slice(1)
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

export default SymbolsFetch;
