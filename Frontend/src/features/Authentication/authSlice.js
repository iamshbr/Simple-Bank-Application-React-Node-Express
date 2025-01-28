import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "Authentication",
  initialState: {
    userData: null,
    status: false
  },
  reducers: {
    login(state, action) {
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout(state, action) {
      state.status = false;
      state.userData = null;
    },
  }
})

export const logoutThunk = () => (dispatch) => {
  fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" } })
    .then((response) => {
      if (response.status === 200) {
        dispatch(logout());
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      dispatch(logout());
    });
}



export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
