import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
export interface inputsValue {
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
  dir: "ASC" | "DESC";
}
interface searchEv {
  status: "idle" | "loading" | "failed";
  events: Ievento[];
  inputsValue: inputsValue;
}
const initialState: searchEv = {
  status: "idle",
  events: [],
  inputsValue: {
    title: "",
    place: "",
    startDate: "new Date()",
    endDate: "",
    page: 0,
    size: 5,
    sort: "startDate",
    dir: "ASC",
  },
};
export interface params {
  title: string;
  startDate: string;
  endDate: string;
  token: string;
  city: string;
  page: number;
  size: number;
  sort: string;
  dir: "ASC" | "DESC";
}
const url = "http://localhost:8081";
let newUrl = "";

export const eventSearch = createAsyncThunk(
  "fetch ev serch",
  async ({ page, size, city, token, startDate, endDate, title, sort, dir }: params) => {
    try {
      if (city !== "" && title !== "" && startDate !== "" && endDate !== "") {
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
        newUrl = url + "/events/search/citta/titolo?cittaProvincia=" + city + "&titolo=" + title;
      } else if (city !== "" && title === "" && (startDate !== "" || endDate !== "")) {
        newUrl =
          url +
          "/events/search/citta/data?cittaProvincia=" +
          city +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate;
      } else {
        newUrl = url + "/events/search/citta?cittaProvincia=" + city;
      }
      // console.log(page, size, city, token);
      const response = await fetch(
        newUrl + "&page=" + page + "&size=" + size + "&sort=" + sort + "," + dir,
        {
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
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
  name: "eventS",
  initialState,
  reducers: {
    saveInputsValues(state, action: PayloadAction<inputsValue>) {
      state.inputsValue = action.payload;
    },
  },
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
export const { saveInputsValues } = eventSearchS.actions;

export default eventSearchS.reducer;
