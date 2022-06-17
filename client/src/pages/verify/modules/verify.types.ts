import { IverifyOtp, Iidentifier } from "service/Identifier/types";

export interface IverifyMethods {
  loadingVerifyButton: boolean;
  setLoadingVerifyButton: (loadingVerifyButton: boolean) => void;
  submitVerify: (data: IverifyOtp) => void;
  identifier?: string;
  setIdentifier?: (idetifer: string) => void;
}

export type { IverifyOtp, Iidentifier };
