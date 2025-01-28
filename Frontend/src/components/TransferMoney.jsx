import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/Authentication/authSlice";
import { useTimer } from "../contexts";

function TransferMoney() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const { initializeTimer } = useTimer();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const transferMoney = function (receiver, amount, currentUser) {
    fetch("/api/transfer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ receiver, amount, currentUser }) })
      .then(async (response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          const error = await response.text();
          throw new Error(error);
        }
      })
      .then((userData) => {
        dispatch(login({ userData }));
        reset();
        initializeTimer();
      })
      .catch((err) => {
        alert(err);
      });
  };

  function submitHandler(data) {
    if (userData.username !== data.receiver) {
      transferMoney(data.receiver, data.amount, userData.username);
    } else {
      alert("Cannot transfer money to yourself!");
    }
  }

  return (
    <>
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <form className="form form--transfer" onSubmit={handleSubmit(submitHandler)}>
          <input type="text" className="form__input form__input--to" {...register("receiver", { required: true })} />
          <input type="number" className="form__input form__input--amount" {...register("amount", { required: true })} />
          <button type="submit" className="form__btn form__btn--transfer" disabled={!isDirty}>
            &rarr;
          </button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </form>
      </div>
    </>
  );
}

export default TransferMoney;
