import { configureStore, ThunkAction, Action, Reducer, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

import userProfileSlice from "./slices/userProfileSlice";
import loginModalSlice from "./slices/loginModalSlice";
import sponsoredEvents from "./slices/eventsSlices/sponsoredEvents";

import eventLikeSlice from "./slices/eventsSlices/eventLikeSlice";
import eventByIdSlice from "./slices/eventsSlices/eventByIdSlice";
import eventSearchSlice from "./slices/eventsSlices/eventSearchSlice";
import sponsoredEventsByCitta from "./slices/eventsSlices/sponsoredEventsByCitta";
import userProfileByIdSlice from "./slices/userProfileByIdSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
  transforms: [encryptTransform({ secretKey: process.env.REACT_APP_SECRET_KEY || "nonandrà" })],
};
const rootReducer = combineReducers({
  userProfile: userProfileSlice,
  loginModal: loginModalSlice,
  sponsoredEv: sponsoredEvents,
  sponsoredEvByCitta: sponsoredEventsByCitta,
  userProfileById: userProfileByIdSlice,
  likeDaUtenu: eventLikeSlice,
  eventByID: eventByIdSlice,
  eventSearch: eventSearchSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
