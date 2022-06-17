import { Ilogin, IsignUp } from "service/Auth/types";

export interface IsignUpMethods {
  loadingSignUpButton: boolean;
  setLoadingSignUpButton: (loadingSignUpButton: boolean) => void;
  submitSignUp: (data: IsignUp) => void;
}

export type { Ilogin, IsignUp };
