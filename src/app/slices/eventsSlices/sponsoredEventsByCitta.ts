import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
export interface Ifetch {
  content: Ievento[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
interface sponsoredEv {
  status: "idle" | "loading" | "failed";
  events: Ifetch;
  citta: string;
}
const initialState: sponsoredEv = {
  status: "idle",
  events: {} as Ifetch,
  citta: "",
};
interface params {
  city: string;
  page: number;
  size: number;
}
const url = "http://localhost:8081/events/sponsored/";
export const sponsoredEvFetchbyCity = createAsyncThunk(
  "fetch sponsored ev by city",
  async ({ city, page, size }: params) => {
    try {
      const response = await fetch(url + city + "?page=" + page + "&size=" + size);
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

const sponsoredEvBycity = createSlice({
  name: "sEvCity",
  initialState,
  reducers: {
    saveInputCity(state, action: PayloadAction<string>) {
      state.citta = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sponsoredEvFetchbyCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sponsoredEvFetchbyCity.fulfilled, (state, action) => {
        state.status = "idle";
        state.events = action.payload;
      })
      .addCase(sponsoredEvFetchbyCity.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { saveInputCity } = sponsoredEvBycity.actions;
export default sponsoredEvBycity.reducer;
