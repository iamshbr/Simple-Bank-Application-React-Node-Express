import { useState, useEffect } from "react";
import "./index.css";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      {/* Top Navigation*/}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
