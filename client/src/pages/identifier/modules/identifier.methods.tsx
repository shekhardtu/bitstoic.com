import { AxiosResponse } from "axios";
import { useState } from "react";
import { IdentifierService } from "service";
import { useRouter } from "next/router";
import { session } from "helpers/lib";
import dayjs from "dayjs";
import { delay, routerConfig } from "helpers/lib";

import { Iidentifier, IidentifierHash } from "./identifier.types";

interface IdentifierMethods {
  loadingIdentifierButton: boolean;
  setLoadingIdentifierButton: (loadingIdentifierButton: boolean) => void;
  error: string;
  setError: (error: string) => void;
  baseUrl: string;
  submitIdentifier: (data: { identifier: string }) => void;
  identifier: Iidentifier;
  identifierHash: IidentifierHash;
}

const identifierService = new IdentifierService("v1");

const IdentifierMethods = (): IdentifierMethods => {
  const router = useRouter();
  const [loadingIdentifierButton, setLoadingIdentifierButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const [identifier, setIdentifier]: [
    Iidentifier,
    (identifier: Iidentifier) => void
  ] = useState({});

  const [identifierHash, setIdentifierHash]: [
    IidentifierHash,
    (identifierHash: IidentifierHash) => void
  ] = useState<IidentifierHash>({});

  const [error, setError]: [string, (error: string) => void] =
    useState<string>("");

  const baseUrl: string = "http://localhost:8080";

  const submitIdentifier = async (data: {
    identifier: string;
  }): Promise<void> => {
    setLoadingIdentifierButton(true);
    setIdentifier(data);

    await identifierService
      .postSendOtp(data)
      .then(async (respData: AxiosResponse) => {
        const { data: response } = respData;
        const { user }: { user: IidentifierHash } = response;

        setIdentifierHash(user);
        await delay(500);
        setLoadingIdentifierButton(false);
        const validUntil = dayjs().add(5, "minute");
        const storageObj: [string, dayjs.Dayjs, IidentifierHash] = [
          routerConfig["verify"].name,
          validUntil,
          user,
        ];
        const encIdentifier = btoa(data.identifier);

        const viewData: [string, IidentifierHash] = [encIdentifier, user];
        session().set("view", storageObj);
        session().set("viewData", viewData);
        router.push(routerConfig["verify"].name);
      })
      .catch((error) => {
        setLoadingIdentifierButton(false);
        setError(error);
      });
  };

  return {
    loadingIdentifierButton,
    setLoadingIdentifierButton,
    identifier,
    error,
    setError,
    baseUrl,
    submitIdentifier,
    identifierHash,
  };
};

export default IdentifierMethods;

// const [loadingIdentifierButton, setLoadingIdentifierButton] = useState(false);
// const baseUrl = "http://localhost:8080";
// const submitIdentifier = () => {
//   IdentifierService(baseUrl).PostSendOtp();
//   setLoadingIdentifierButton(true);
// };
