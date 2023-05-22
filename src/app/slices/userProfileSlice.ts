import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAuth from "../../auth/hooks/useAuth";
import { IuserProfile } from "../../interfaces/luoghiDiInteresseInt";

interface userProfile {
  userLogged: IuserProfile;
  status: "idle" | "loading" | "failed";
}
const initialState: userProfile = {
  userLogged: {} as IuserProfile,
  status: "idle",
};
const url = "http://localhost:8081/user/username/";
export interface params {
  username: string;
  token: string;
}

export const userProfileFetch = createAsyncThunk(
  "fetchComment",
  async ({ username, token }: params) => {
    console.log(token);

    try {
      const response = await fetch(url + username, {
        method: "Get",
        // body: JSON.stringify(commentToPost),
        headers: {
          Authorization: "Bearer " + token || "nonandra",
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
const userProfileSlice = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfileFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userProfileFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.userLogged = action.payload;
      })
      .addCase(userProfileFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userProfileSlice.reducer;
