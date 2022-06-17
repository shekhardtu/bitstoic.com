export interface Ilogin {
  identifier: string;
  password: string;
}

export interface IsignUp extends Ilogin {
  fullName?: string;
}
