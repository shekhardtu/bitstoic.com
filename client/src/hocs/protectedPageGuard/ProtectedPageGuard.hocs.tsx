import { session } from "helpers/lib";
import { isClient } from "helpers/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { NextRouter, useRouter } from "next/router";

interface IprotectedPageGuard {
  children: React.ReactElement;
}
export const ProtectedPageGuard: React.FC<IprotectedPageGuard> = ({
  children,
}) => {
  console.count("Protected");

  const router = useRouter();

  const [nextView, setNextView] = useState(null);
  const [validBy, setValidBy] = useState(dayjs());

  useEffect(() => {
    const sessionStorage = session().get("view");
    if (!sessionStorage) {
      return () => {
        router.push("/");
      };
    }
    const [view, validUntil] = sessionStorage;
    setNextView(view);
    setValidBy(validUntil);
  }, [router]);

  if (nextView && dayjs(validBy).isAfter(dayjs())) {
    return children;
  }

  return children;
};

ProtectedPageGuard.displayName = "ProtectedPageGuard";
