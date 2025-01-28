import React from "react";

function Transaction({ depositType, depositValue, depositDate }) {
  return (
    <div className="transactions__row">
      <div className={`transactions__type transactions__type--${depositType.split(" ")[1].toLowerCase()}`}>{depositType}</div>
      <div className="transactions__date">{depositDate}</div>
      <div className="transactions__value">{depositValue}</div>
    </div>
  );
}

export default Transaction;
