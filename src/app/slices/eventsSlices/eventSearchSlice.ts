import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";

interface searchEv {
  status: "idle" | "loading" | "failed";
  events: Ievento[];
}
const initialState: searchEv = {
  status: "idle",
  events: [],
};
export interface params {
  title: string;
  startDate: string;
  endDate: string;
  token: string;
  city: string;
  page: number;
  size: number;
}
const url = "http://localhost:8081";
let newUrl = "";

export const eventSearch = createAsyncThunk(
  "fetch ev serch",
  async ({ page, size, city, token, startDate, endDate, title }: params) => {
    try {
      if (city !== "" && title !== "" && startDate !== "" && endDate !== "") {
        console.log("caso 1");
        newUrl =
          url +
          "/events/search/title?titolo=" +
          title +
          "&cittaProvincia=" +
          city +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate;
      } else if (city !== "" && title !== "" && (startDate === "" || endDate === "")) {
        console.log("caso 2");
        newUrl = url + "/events/search/citta/titolo?cittaProvincia=" + city + "&titolo=" + title;
      } else if (city !== "" && title === "" && (startDate !== "" || endDate !== "")) {
        console.log("caso 3");
        newUrl =
          url +
          "/events/search/citta/data?cittaProvincia=" +
          city +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate;
      } else {
        console.log("caso 4");
        newUrl = url + "/events/search/citta?cittaProvincia=" + city;
      }
      // console.log(page, size, city, token);
      const response = await fetch(newUrl + "&page=" + page + "&size=" + size, {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      });
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

const eventSearchS = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(eventSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(eventSearch.fulfilled, (state, action) => {
        state.status = "idle";
        state.events = action.payload;
      })
      .addCase(eventSearch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default eventSearchS.reducer;
