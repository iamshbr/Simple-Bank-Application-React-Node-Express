import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/Authentication/authSlice";
import { useTimer } from "../contexts";

function Loan() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const { initializeTimer } = useTimer();

  const loanRequest = function (data) {
    if (data.amount > 0) {
      fetch("/api/loan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, currentUsername: userData.username }) })
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
    }
  };

  return (
    <>
      <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan" onSubmit={handleSubmit(loanRequest)}>
          <input type="number" className="form__input form__input--loan-amount" {...register("amount", { required: true })} />
          <button className="form__btn form__btn--loan" disabled={!isDirty}>
            &rarr;
          </button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>
    </>
  );
}

export default Loan;
