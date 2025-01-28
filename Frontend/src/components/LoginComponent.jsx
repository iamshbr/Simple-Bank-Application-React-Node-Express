import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../features/Authentication/authSlice";

function LoginComponent() {
  const [inputDisabled, setInputDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((userData) => {
        if (Object.keys(userData).length > 0) {
          setInputDisabled(true);
          dispatch(login({ userData }));
        } else {
          alert("User does not exist!");
        }
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <form className="login" onSubmit={handleSubmit(submitHandler)}>
        <input type="text" placeholder="User" className="login__input login__input--user" {...register("username", { required: true })} disabled={inputDisabled} />
        <input
          type="password"
          placeholder="Pin"
          maxLength="4"
          className="login__input login__input--pin"
          {...register("password", { required: true })}
          disabled={inputDisabled}
        />
        <button className="login__btn" type="submit" disabled={inputDisabled}>
          &rarr;
        </button>
      </form>
    </>
  );
}

export default LoginComponent;
