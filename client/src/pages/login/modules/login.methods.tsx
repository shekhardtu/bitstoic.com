import { AxiosResponse } from "axios";
import { delay } from "helpers/lib/utils";
import { useRouter } from "next/router";

import { useState } from "react";
import { AuthService } from "service";
import { Ilogin, IloginMethods } from "./login.types";

const authService = new AuthService("v1");

const LoginMethods = (): IloginMethods => {
  const router = useRouter();
  const [loadingLoginButton, setLoadingLoginButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const submitLogin = async (data: Ilogin) => {
    setLoadingLoginButton(true);
    try {
      const { data: postLoginResp }: AxiosResponse =
        await authService.postLogin(data);
      if (postLoginResp.tokens) {
        router.push("/account");
      }
    } catch (error) {
    } finally {
      await delay(1000);
      setLoadingLoginButton(false);
    }
  };
  return {
    loadingLoginButton,
    setLoadingLoginButton,
    submitLogin,
  };
};

export default LoginMethods;

// const [loadingIdentifierButton, setLoadingIdentifierButton] = useState(false);
// const baseUrl = "http://localhost:8080";
// const submitIdentifier = () => {
//   IdentifierService(baseUrl).PostSendOtp();
//   setLoadingIdentifierButton(true);
// };
