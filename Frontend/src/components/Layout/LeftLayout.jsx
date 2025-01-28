import React from "react";
import { BalanceComponent, Transactions, Summary } from "../";

function LeftLayout() {
  return (
    <>
      <BalanceComponent />
      <Transactions />
      <Summary />
    </>
  );
}

export default LeftLayout;
