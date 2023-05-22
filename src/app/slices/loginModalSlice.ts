import { createSlice } from "@reduxjs/toolkit";

export interface Ishow {
  show: boolean;
}
const initialState: Ishow = {
  show: false,
};

const loginModalSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    toogleLoginM(state) {
      state.show = !state.show;
    },
    hideLoginM(state) {
      state.show = false;
    },
    showLoginM(state) {
      state.show = true;
    },
  },
});
export const { toogleLoginM, hideLoginM, showLoginM } = loginModalSlice.actions;
export default loginModalSlice.reducer;
