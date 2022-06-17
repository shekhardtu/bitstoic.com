import { AxiosResponse } from "axios";
import { delay } from "helpers/lib/utils";
import { useState } from "react";
import { AuthService } from "service";
import { IsignUp, IsignUpMethods } from "./sign-up.types";

const authService = new AuthService("v1");

const SignUpMethods = (): IsignUpMethods => {
  const [loadingSignUpButton, setLoadingSignUpButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const submitSignUp = async (data: IsignUp) => {
    setLoadingSignUpButton(true);
    try {
      await authService.postSignUp(data);
    } catch (error) {
    } finally {
      await delay(1000);
      setLoadingSignUpButton(false);
    }
  };
  return {
    loadingSignUpButton,
    setLoadingSignUpButton,
    submitSignUp,
  };
};

export default SignUpMethods;

// const [loadingIdentifierButton, setLoadingIdentifierButton] = useState(false);
// const baseUrl = "http://localhost:8080";
// const submitIdentifier = () => {
//   IdentifierService(baseUrl).PostSendOtp();
//   setLoadingIdentifierButton(true);
// };
