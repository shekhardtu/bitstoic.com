import { Ilogin } from "service/Auth/types";

export interface IloginMethods {
  loadingLoginButton: boolean;
  setLoadingLoginButton: (loadingLoginButton: boolean) => void;
  submitLogin: (data: Ilogin) => void;
}

export type { Ilogin };
