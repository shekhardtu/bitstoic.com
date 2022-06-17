import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import * as Sentry from "@sentry/browser";
import { ProtectedPageGuard } from "hocs";
type NextPageWithLayout = NextPage & {
  isProtectedPage?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      {Component.isProtectedPage ? (
        <ProtectedPageGuard>
          <Component {...pageProps} />
        </ProtectedPageGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
