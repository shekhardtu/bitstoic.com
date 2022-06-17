import { isClient } from "./utils";
export {};

export const session = (
  key?: string,
  value?: string,
  prefix: string = "@diet"
) => {
  return {
    get: (key: string) => {
      const item = window.sessionStorage.getItem(`${prefix}::${key}`);
      return item ? JSON.parse(item) : item;
    },
    set: (key: string, value: any) =>
      window.sessionStorage.setItem(`${prefix}::${key}`, JSON.stringify(value)),
    remove: (key: string) =>
      window.sessionStorage.removeItem(`${prefix}::${key}`),
    clear: () => window.sessionStorage.clear(),
  };
};

export const local = (key: string, value?: string) => {
  if (!isClient) return null;
  return {
    get: (key: string) => window.localStorage.getItem(key),
    set: (key: string, value: string) =>
      window.localStorage.setItem(key, value),
    remove: (key: string) => window.localStorage.removeItem(key),
    clear: () => window.localStorage.clear(),
  };
};
