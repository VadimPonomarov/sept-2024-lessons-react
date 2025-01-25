import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

import { IDummyAuthRefreshResponse } from "@/common/interfaces/dummy.interfaces.ts";
import { initialState } from "@/store/slises/Ini/constants.ts";

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const iniSlice = createSlice({
  name: "ini",
  initialState,
  reducers: (create) => ({
    setTokenPair: create.reducer<IDummyAuthRefreshResponse>((state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }),
  }),
  selectors: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
  },
});

export const { ...iniActions } = iniSlice.actions;
export const { ...iniSelectors } = iniSlice.selectors;

export default iniSlice.reducer;
