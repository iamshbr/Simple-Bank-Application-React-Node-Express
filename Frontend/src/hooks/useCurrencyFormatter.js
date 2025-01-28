import { React, useState } from "react";

function useCurrencyFormatter(currencyType, locale, amount) {
  if ((currencyType, locale)) {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currencyType }).format(amount);
  }
  return amount;
}

export default useCurrencyFormatter