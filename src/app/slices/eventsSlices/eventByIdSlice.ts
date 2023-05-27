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
  id_eve: number;
}
const url = "http://localhost:8081/events/info/";
export const getEventByID = createAsyncThunk("fetch by id", async ({ id_eve }: params) => {
  try {
    const response = await fetch(url + id_eve);
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
});

const EvByID = createSlice({
  name: "idEv",
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
