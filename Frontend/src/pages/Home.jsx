import { useEffect, React } from "react";
import { MainLayout } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/Authentication/authSlice";

function Home() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    fetch("/api/isLoggedIn", { method: "GET", headers: { "Content-Type": "application/json" } })
      .then((response) => response.json())
      .then((userData) => {
        if (Object.keys(userData).length > 0) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <>{status ? <MainLayout /> : ""}</>;
}

export default Home;
