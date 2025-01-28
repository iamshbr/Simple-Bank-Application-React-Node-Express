import { useSelector, useDispatch } from "react-redux";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";
import { Sort } from "./";

function Summary() {
  const userData = useSelector((state) => state.auth.userData);

  const deposits = userData.transactions.filter((mov) => mov > 0);
  const incomes = deposits.reduce((acc, cur) => acc + cur, 0);
  const outgoing = userData.transactions.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0);
  const interest = deposits
    .map((dep) => (dep * userData.interestRate) / 100)
    .filter((int, i, arr) => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  const char = <>&downarrow;</>;

  return (
    <>
      <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">{useCurrencyFormatter(userData.currency, userData.locale, incomes)}</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">{useCurrencyFormatter(userData.currency, userData.locale, outgoing)}</p>
        <p className="summary__label">Interest</p>
        <p className="summary__value summary__value--interest">{useCurrencyFormatter(userData.currency, userData.locale, interest)}</p>
        <Sort />
      </div>
    </>
  );
}

export default Summary;
