import { IDummyAuthMeResponse } from "@/common/interfaces/dummy.interfaces.ts";

export interface IniState {
  accessToken?: string;
  refreshToken?: string;
  authMe?: IDummyAuthMeResponse;
}
