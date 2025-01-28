import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

import {
  IDummyAuthMeResponse,
  IDummyAuthRefreshResponse,
} from "@/common/interfaces/dummy.interfaces.ts";
import { initialState } from "@/store/slises/Ini/constants.ts";

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const iniSlice = createSlice({
  name: "ini",
  initialState,
  reducers: create => ({
    setTokenPair: create.reducer<IDummyAuthRefreshResponse>((state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }),
    unsetTokenPair: create.reducer<void>(state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    }),
    setMe: create.reducer<IDummyAuthMeResponse>((state, action) => {
      state.authMe = action.payload;
    }),
    unsetMe: create.reducer<void>(state => {
      state.authMe = undefined;
    }),
  }),
});

export const { ...iniActions } = iniSlice.actions;

export default iniSlice.reducer;
