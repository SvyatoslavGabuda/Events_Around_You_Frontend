import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";

interface sponsoredEv {
  status: "idle" | "loading" | "failed";
  events: Ievento[];
}
const initialState: sponsoredEv = {
  status: "idle",
  events: [],
};
export interface params {
  startDate: string;
  endDate: string;
  token: string;
  city: string;
  page: number;
  size: number;
}
const url = "http://localhost:8081/events/search/citta/data?cittaProvincia=";

export const eventSearchBycityAndDateFetch = createAsyncThunk(
  "fetch ev serch",
  async ({ page, size, city, token, startDate, endDate }: params) => {
    try {
      console.log(page, size, city, token);
      const response = await fetch(
        url +
          city +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate +
          "&page=" +
          page +
          "&size=" +
          size,
        {
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        return data;
      } else {
        console.log("non ha funzionato");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const eventSearchBycityAndDate = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(eventSearchBycityAndDateFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(eventSearchBycityAndDateFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.events = action.payload;
      })
      .addCase(eventSearchBycityAndDateFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default eventSearchBycityAndDate.reducer;
