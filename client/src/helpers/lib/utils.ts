export const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

/*
 * isClient
 * condition whether server-side or client-side
 */
export const isClient: boolean = typeof window === "object";

export const routerConfig = {
  verify: {
    name: "verify",
    router: "verify",
  },
  "create-profile": {
    name: "create-profile",
    router: "create-profile",
  },
};
