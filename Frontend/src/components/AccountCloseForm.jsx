import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../contexts";
import { logoutThunk } from "../features/Authentication/authSlice";
import { useForm } from "react-hook-form";

function AccountCloseForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const accountCloseHandler = function (data) {
    fetch("/api/accountClose", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data }) })
      .then(async (response) => {
        const res = response.statusText;
        const text = await response.text();
        alert(res);
        text === "true" && dispatch(logoutThunk());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="operation operation--close">
        <h2>Close account</h2>
        <form className="form form--close" onSubmit={handleSubmit(accountCloseHandler)}>
          <input type="text" className="form__input form__input--user" {...register("username", { required: true })} />
          <input type="password" maxLength="6" className="form__input form__input--pin" {...register("password", { required: true })} />
          <button className="form__btn form__btn--close" disabled={!isDirty}>
            &rarr;
          </button>
          <label className="form__label">Confirm user</label>
          <label className="form__label">Confirm PIN</label>
        </form>
      </div>
    </>
  );
}

export default AccountCloseForm;
