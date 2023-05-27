import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";

interface sponsoredEv {
  status: "idle" | "loading" | "failed";
  events: Ievento[];
  page: number;
  size: number;
}
const initialState: sponsoredEv = {
  status: "idle",
  events: [],
  page: 0,
  size: 4,
};
const url =
  "http://localhost:8081/events/sponsored?page=" + initialState.page + "&size=" + initialState.size;
export const sponsoredEvFetch = createAsyncThunk("fetch sponsored ev", async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data.content);

      return data.content;
    } else {
      console.log("non ha funzionato");
    }
  } catch (error) {
    console.log(error);
  }
});

const sponsoredEv = createSlice({
  name: "sEv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sponsoredEvFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sponsoredEvFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.events = action.payload;
      })
      .addCase(sponsoredEvFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default sponsoredEv.reducer;
