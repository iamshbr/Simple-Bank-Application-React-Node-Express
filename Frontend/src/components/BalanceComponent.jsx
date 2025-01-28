import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";

function BalanceComponent() {
  const transactions = useSelector((state) => state.auth.userData)?.transactions ?? [];
  const currency = useSelector((state) => state.auth.userData)?.currency;
  const locale = useSelector((state) => state.auth.userData)?.locale;
  const totalBalance = useSelector((state) => state.auth.userData)?.balance ?? 0;

  const [date, setDate] = useState();

  const displayDate = function (locale) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    return new Intl.DateTimeFormat(locale, options).format();
  };

  useEffect(() => {
    if (locale) setDate(displayDate(locale));
    const interval = setInterval(() => {
      if (locale) setDate(displayDate(locale));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <>
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{date}</span>
          </p>
        </div>
        <p className="balance__value">{useCurrencyFormatter(currency, locale, totalBalance)}</p>
      </div>
    </>
  );
}

export default BalanceComponent;
