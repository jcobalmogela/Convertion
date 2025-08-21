import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";


//component
import SymbolsFetch from "./Components/SymbolsData";
import SetCurrencyData from "./Components/SetCurrencyData";
import ConvertRates from "./Components/ConvertRates";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2a2826",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  ...theme.applyStyles("kight", {
    backgroundColor: "#1A2027",
    height: "200px",
  }),
}));

export default function BasicGrid() {
  const [date, setDate] = useState("");
  const [symbols, setSymbols] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PHP");
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(null);
  const [fromRate, setFromRate] = useState("");
  const [toRate, setToRate] = useState("");

  const convertCurrency = (value) => {
   return value.toLowerCase();
  }


  return (
    <Container>
      <Box sx={{ flexGrow: 1, color: "white" }}>
        <Grid
          container
          spacing={2}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }}
        >
          <Grid item xs={12} size={12}>
            <Item sx={{ p: 2 }}>
              {symbols && Object.keys(symbols).length > 0 ? (
                <div>
                  {converted ? (
                    <Typography variant="h6" sx={{ color: "#7affae" }}>
                      <p>
                        {amount} {fromCurrency} ={" "}
                        <span sx={{ color: "#7affae" }}>
                          {" "}
                          {converted.toFixed(2)} {toCurrency}{" "}
                        </span>
                      </p>
                    </Typography>
                  ) : (
                    <Typography variant="h6" sx={{ color: "#7affae" }}>
                      <p>
                        Please enter an amount and select currencies to convert.
                      </p>
                    </Typography>
                  )}
                </div>
              ) : (
                <CircularProgress sx={{ color: "#7affae" }}></CircularProgress>
              )}
            </Item>
          </Grid>
          <Grid item xs={12} md={4} size={4}>
            <SymbolsFetch
              Item={Item}
              symbols={symbols}
              setSymbols={setSymbols}
              fromCurrency={fromCurrency}
              setFromCurrency={setFromCurrency}
              convertCurrency={convertCurrency}
            ></SymbolsFetch>
          </Grid>
          <Grid item xs={12} md={4} size={4}>
            <ConvertRates
              toCurrency={toCurrency}
              setToCurrency={setToCurrency}
              Item={Item}
              symbols={symbols}
              setSymbols={setSymbols}
              fromCurrency={fromCurrency}
              setFromCurrency={setFromCurrency}
              amount={amount}
              setAmount={setAmount}
              setConverted={setConverted}
              setDate={setDate}
              setFromRate={setFromRate}
              setToRate={setToRate}
            ></ConvertRates>
          </Grid>
          <Grid item xs={12} md={4} size={4}>
            <SetCurrencyData
              item
              xs={12}
              sm={6}
              md={4}
              toCurrency={toCurrency}
              setToCurrency={setToCurrency}
              Item={Item}
              symbols={symbols}
              setSymbols={setSymbols}
              fromCurrency={fromCurrency}
              setFromCurrency={setFromCurrency}
              setToRate={setToRate}
              convertCurrency={convertCurrency}
            ></SetCurrencyData>
          </Grid>
          <Grid item xs={12}>
            <Item sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Box sx={{ p: 2, bgcolor: "#3f3f3fff" }}>
                    <Typography variant="h6" sx={{ color: "#7affae" }}>
                      Latest Rate Info
                    </Typography>
                    {date && (
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        Date:{" "}
                        {new Date(date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    )}
                    {fromRate && (
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {fromCurrency} - {fromRate}
                      </Typography>
                    )}
                     {toRate && (
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {toCurrency} - {toRate}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
