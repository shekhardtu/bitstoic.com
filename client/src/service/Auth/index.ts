import axios from "../axios";
import { env } from "process";
import { Ilogin, IsignUp } from "./types";
import { AxiosResponse } from "axios";

// const baseUrl = window.localhost[env].baseUrl;

class AuthService {
  version: string;
  baseUrl: string;
  service: string;

  constructor(baseUrl: string, version: string = "v1") {
    this.version = version;
    this.baseUrl = baseUrl;
    this.service = "auth";
  }

  postSignUp(body: IsignUp): Promise<AxiosResponse<IsignUp, any>> {
    return axios.post<IsignUp>(
      `/${this.version}/${this.service}/sign-up`,
      body
    );
  }

  postLogin(body: Ilogin): Promise<AxiosResponse<Ilogin, any>> {
    return axios.post<Ilogin>(`/${this.version}/${this.service}/sign-in`, body);
  }
}

export { AuthService };
