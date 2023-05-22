import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface likeEvI {
  status: "idle" | "loading" | "failed";
}
const initialState: likeEvI = {
  status: "idle",
};
interface params {
  token: string;
  id_user: number;
  id_eve: number;
}
const url = "http://localhost:8081/events/like/";
export const likeEvFetch = createAsyncThunk(
  "fetch sponsored ev",
  async ({ token, id_user, id_eve }: params) => {
    try {
      const response = await fetch(url + id_user + "/" + id_eve, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log("like ok");
      } else {
        console.log("non ha funzionato");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const likeEv = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeEvFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeEvFetch.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(likeEvFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default likeEv.reducer;
