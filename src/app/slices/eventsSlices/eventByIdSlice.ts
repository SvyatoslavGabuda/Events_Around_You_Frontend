import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
interface IstateEventByID {
  event: Ievento;
  status: "idle" | "loading" | "failed";
}
const initialState: IstateEventByID = {
  event: {} as Ievento,
  status: "idle",
};
interface params {
  token: string;
  id_eve: number;
}
const url = "http://localhost:8081/events/";
export const getEventByID = createAsyncThunk(
  "fetch sponsored ev",
  async ({ token, id_eve }: params) => {
    try {
      const response = await fetch(url + id_eve, {
        method: "GET",
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

const EvByID = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventByID.fulfilled, (state, action) => {
        state.status = "idle";
        state.event = action.payload;
      })
      .addCase(getEventByID.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default EvByID.reducer;
