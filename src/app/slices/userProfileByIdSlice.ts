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
const url = "http://localhost:8081/user/";
export interface params {
  id: number;
  token: string;
}

export const userProfileByIDFetch = createAsyncThunk(
  "fetch user by id",
  async ({ id, token }: params) => {
    console.log(token);

    try {
      const response = await fetch(url + id, {
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
const userProfileByIDSlice = createSlice({
  name: "save",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfileByIDFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userProfileByIDFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.userLogged = action.payload;
      })
      .addCase(userProfileByIDFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userProfileByIDSlice.reducer;
