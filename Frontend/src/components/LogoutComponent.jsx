import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout, logoutThunk } from "../features/Authentication/authSlice";

function LogoutComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutBtnRef = useRef();

  const logoutHandler = function () {
    dispatch(logoutThunk());
  };

  return (
    <button type="button" className="logoutBtn" onClick={logoutHandler}>
      Logout
    </button>
  );
}

export default LogoutComponent;
