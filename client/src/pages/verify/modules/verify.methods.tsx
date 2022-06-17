import { AxiosResponse } from "axios";
import { session } from "helpers/lib";
import { delay } from "helpers/lib/utils";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { IdentifierService } from "service";

import { IverifyMethods, IverifyOtp } from "./verify.types";

const identifierService = new IdentifierService("v1");

const VerifyMethods = (): IverifyMethods => {
  const router = useRouter();
  const [loadingVerifyButton, setLoadingVerifyButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const [identifier, setIdentifer]: [
    string | undefined,
    (identifier: string) => void
  ] = useState<string>();

  useEffect(() => {
    const viewData = session().get("viewData");

    if (!viewData) {
      return () => {
        router.push("/");
      };
    }

    const [encIdentifier] = viewData;
    setIdentifer(atob(encIdentifier));
  }, [router]);

  const submitVerify = async (data: IverifyOtp) => {
    setLoadingVerifyButton(true);
    const viewData = session().get("viewData");
    const [, user] = viewData;
    const { identifier: identifierHash } = user;
    data.identifier = identifierHash;
    try {
      const { data: postVerifyResp }: AxiosResponse =
        await identifierService.postVerifyOtp(data);
      if (postVerifyResp.tokens) {
        router.push("/account");
      } else {
        router.push("create-profile");
      }
    } catch (error) {
    } finally {
      await delay(1000);
      setLoadingVerifyButton(false);
    }
  };
  return {
    loadingVerifyButton,
    setLoadingVerifyButton,
    identifier,
    submitVerify,
  };
};

export default VerifyMethods;
