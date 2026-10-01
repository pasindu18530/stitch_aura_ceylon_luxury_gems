import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

const RATES = {
  USD: { rate: 1.0, symbol: "$", prefix: true },
  EUR: { rate: 0.92, symbol: "€", prefix: true },
  GBP: { rate: 0.78, symbol: "£", prefix: true },
  LKR: { rate: 305.0, symbol: "Rs ", prefix: true }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  const formatPrice = (amountInUSD) => {
    if (typeof amountInUSD !== "number") return amountInUSD;
    const { rate, symbol, prefix } = RATES[currency] || RATES.USD;
    const converted = Math.round(amountInUSD * rate);
    const formattedNum = converted.toLocaleString();
    return prefix ? `${symbol}${formattedNum}` : `${formattedNum} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencies: Object.keys(RATES) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
