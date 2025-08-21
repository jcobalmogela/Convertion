import React, { useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormHelperText } from "@mui/material";
import { CircularProgress } from "@mui/material";

function ConvertRates({
  Item,
  fromCurrency,
  toCurrency,
  amount,
  setAmount,
  setConverted,
  setDate,
  symbols,
  setFromRate,
  setToRate,
}) {
  useEffect(() => {
    if (!fromCurrency || !toCurrency || !symbols) return;

    const fetchRates = async () => {
      try {
        const res = await axios.get(
          "https://api.currencyfreaks.com/v2.0/rates/latest",
          {
            params: {
              apikey: "35ca18972eda4714a6e02820f4831c30",
              symbols: `${fromCurrency},${toCurrency}`,
            },
          }
        );
        const rates = res.data.rates;
        const fromRate = Number(rates[fromCurrency]);
        setFromRate(fromRate);
        setDate(res.data.date);
        setToRate(Number(rates[toCurrency]));
      } catch (error) {
        // Optionally handle error
      }
    };

    fetchRates();
  }, [fromCurrency, toCurrency, symbols, setFromRate, setDate, setToRate]);

  useEffect(() => {
    if (!amount || !fromCurrency || !toCurrency || !symbols) return;

    const fetchRates = async () => {
      try {
        const res = await axios.get(
          "https://api.currencyfreaks.com/v2.0/rates/latest",
          {
            params: {
              apikey: "887a2c0cd47c459fbce4644956684728",
              symbols: `${fromCurrency},${toCurrency}`,
            },
          }
        );

        const rates = res.data.rates;
        const fromRate = Number(rates[fromCurrency]);
        const toRate = Number(rates[toCurrency]);
        const result = (toRate / fromRate) * amount;
        setConverted(result);
        setDate(res.data.date);
        setFromRate(fromRate);
        console.log(rates);
      } catch (error) {
        if (error.response) {
          console.error("API error:", error.response.data);
        }
        console.error("Conversion error:", error.message);
      }
    };

    fetchRates();
  }, [
    amount,
    fromCurrency,
    toCurrency,
    setConverted,
    setDate,
    symbols,
    setFromRate,
  ]);

  return (
    <Item sx={{ p: 2 }}>
      {symbols && Object.keys(symbols).length > 0 ? (
        <FormControl variant="outlined" fullWidth sx={{ textAlign: "center" }}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Amount
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount"
            step="any"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              input: { color: "white" },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#90caf9",
              },
              caretColor: "white",
              input: {
                color: "white",
                textAlign: "center", // 🔥 This centers the placeholder text
              },
            }}
          />
          <FormHelperText
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: "center",
              width: "100%", // Ensure it spans full width
              display: "block", // Force block so text-align works
              padding: "8px 0",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: "0.02857em",
            }}
          >
            Please enter the amount to convert.
          </FormHelperText>
        </FormControl>
      ) : (
        <CircularProgress sx={{ color: "#7affae" }}></CircularProgress>
      )}
    </Item>
  );
}

export default ConvertRates;
