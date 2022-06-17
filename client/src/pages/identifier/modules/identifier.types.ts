export interface IidentifierInput {
  identifier: string;
}

export interface IsubmitOtp {
  identifier: string;
  otp: string;
}

export interface Iidentifier {
  identifier?: string;
}

export interface IidentifierHash {
  identifier?: string;
  otp?: string;
  id?: string;
  isVerified?: boolean;
}
