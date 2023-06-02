import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface likeEvI {
  status: "idle" | "loading" | "failed";
  userLikes: number[];
}
const initialState: likeEvI = {
  status: "idle",
  userLikes: [],
};
interface params {
  token: string;
  id_user: number;
  id_eve: number;
}
const url = "http://localhost:8081/events/like/";
export const likeEvFetch = createAsyncThunk(
  "fetch like",
  async ({ token, id_user, id_eve }: params) => {
    try {
      const response = await fetch(url + id_user + "/" + id_eve, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
          "Cache-Control": "no-store",
        },
      });
      if (response.ok) {
        // console.log("like ok");
      } else {
        console.log("non ha funzionato");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const likeEv = createSlice({
  name: "saveLikes",
  initialState,
  reducers: {
    userLikes(state, action: PayloadAction<number>) {
      state.userLikes = !state.userLikes.includes(action.payload)
        ? [...state.userLikes, action.payload]
        : state.userLikes.filter((el) => el !== action.payload);
    },
    emptiLikes(state) {
      state.userLikes = [];
    },
  },
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
export const { userLikes, emptiLikes } = likeEv.actions;
export default likeEv.reducer;
