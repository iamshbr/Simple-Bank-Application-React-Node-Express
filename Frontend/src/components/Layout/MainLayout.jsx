import { React, useEffect, useState, useRef } from "react";
import { LeftLayout, RightLayout } from "../";

function MainLayout() {
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.style.opacity = 100;
    }, 100);
  }, []);

  return (
    <>
      <main className="app" ref={ref}>
        <LeftLayout />
        <RightLayout />
      </main>
    </>
  );
}

export default MainLayout;
