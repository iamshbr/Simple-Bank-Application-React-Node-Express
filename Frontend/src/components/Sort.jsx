import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/Authentication/authSlice";

function Sort() {
  const [sort, setSort] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/sort", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sort, currentUsername: userData.username }) })
      .then(async (response) => {
        const userData = await response.json();
        dispatch(login({ userData }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sort]);

  return (
    <button className="btn--sort" onClick={() => setSort(!sort)}>
      {sort ? "↑" : "↓"} SORT
    </button>
  );
}

export default Sort;
