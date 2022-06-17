import axios from "../axios";
import { env } from "process";
import { IdentifierType, VerifyOtpType } from "./types";
import { AxiosResponse } from "axios";

// const baseUrl = window.localhost[env].baseUrl;

class IdentifierService {
  version: string;
  baseUrl: string;
  service: string;

  constructor(baseUrl: string, version: string = "v1") {
    this.version = version;
    this.baseUrl = baseUrl;
    this.service = "identifier";
  }

  private v1 = "v1";

  postSendOtp(
    body: IdentifierType
  ): Promise<AxiosResponse<IdentifierType, any>> {
    return axios.post<IdentifierType>(
      `/${this.v1}/${this.service}/send-otp`,
      body
    );
  }

  postVerifyOtp(
    body: VerifyOtpType
  ): Promise<AxiosResponse<VerifyOtpType, any>> {
    return axios.post<VerifyOtpType>(
      `/${this.v1}/${this.service}/verify-otp`,
      body
    );
  }
}

export { IdentifierService };
