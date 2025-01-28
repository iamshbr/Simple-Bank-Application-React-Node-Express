import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";
import { Transaction } from "../components";

function Transactions() {
  const userData = useSelector((state) => state.auth.userData);
  const transactions = userData?.transactions;
  const transactionDate = userData?.transactionDates;
  const currency = userData?.currency;
  const locale = userData?.locale;

  const [formattedTransactions, setFormattedTransactions] = useState([]);
  const [formattedTransactionDates, setFormattedTransactionDates] = useState([]);

  const formatTransactionDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), new Date(date));
    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(new Date(date));
  };

  useEffect(() => {
    if (transactions && transactionDate) {
      setFormattedTransactions(
        transactions.map((trans) => {
          return useCurrencyFormatter(currency, locale, trans);
        })
      );

      setFormattedTransactionDates(
        transactionDate.map((trans) => {
          return formatTransactionDate(trans, locale);
        })
      );
    }
  }, [transactions]);

  return (
    <>
      <div className="transactions">
        {formattedTransactions.map((trans, index) => {
          return (
            <Transaction
              key={index}
              depositValue={trans}
              depositDate={formattedTransactionDates[index]}
              depositType={`${index + 1} ${transactions[index] > 0 ? "DEPOSIT" : "WITHDRAWAL"}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default Transactions;
