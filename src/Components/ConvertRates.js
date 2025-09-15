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
    const API_KEY = "5cca8d2c32284f7a8454b513c6d5320d"; // ✅ use one key only

    // shared function for fetching rates
    const fetchRates = async () => {
        try {
            const res = await axios.get(
                `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=${fromCurrency},${toCurrency}`
            );

            const rates = res.data.rates;
            const fromRate = Number(rates[fromCurrency]);
            const toRate = Number(rates[toCurrency]);

            // update base rates
            setFromRate(fromRate);
            setToRate(toRate);
            setDate(res.data.date);

            // if amount is provided, also calculate conversion
            if (amount) {
                const result = (toRate / fromRate) * amount;
                setConverted(result);
            }
        } catch (error) {
            if (error.response) {
                console.error("API error:", error.response.data);
            } else {
                console.error("Conversion error:", error.message);
            }
        }
    };

    // fetch rates when currencies change
    useEffect(() => {
        if (!fromCurrency || !toCurrency || !symbols) return;
        fetchRates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromCurrency, toCurrency, symbols]);

    // recalc when amount changes
    useEffect(() => {
        if (!amount || !fromCurrency || !toCurrency || !symbols) return;
        fetchRates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount]);

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
                                textAlign: "center",
                            },
                        }}
                    />
                    <FormHelperText
                        sx={{
                            color: "rgba(255, 255, 255, 0.6)",
                            textAlign: "center",
                            width: "100%",
                            display: "block",
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
                <CircularProgress sx={{ color: "#7affae" }} />
            )}
        </Item>
    );
}

export default ConvertRates;
