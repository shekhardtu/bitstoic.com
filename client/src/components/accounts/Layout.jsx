import { useEffect } from "react";
import { useRouter } from "next/router";

import { userService } from "services";

export { Layout };

function Layout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (userService.userValue) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="2xlcontainer">{children}</div>;
}
