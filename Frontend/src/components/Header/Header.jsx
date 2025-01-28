import React, { useEffect, useState } from "react";
import { LoginComponent, LogoutComponent } from "../../components";
import { useSelector } from "react-redux";

function Header() {
  const status = useSelector((state) => state.auth.status);
  const userName = useSelector((state) => state.auth.userData)?.owner;

  return (
    <>
      <nav>
        <p className="welcome">{status ? `Welcome Back, ${userName}` : "Log in to get started"}</p>
        {status ? <LogoutComponent /> : <LoginComponent />}
      </nav>
    </>
  );
}

export default Header;
