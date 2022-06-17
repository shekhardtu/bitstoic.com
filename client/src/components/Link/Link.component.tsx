import React, { useMemo } from "react";
import cx from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

import styles from "./Link.module.scss";

export type LinkProps = NextLinkProps & {
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
  children?: React.ReactNode;
};

export const Link: React.FC<LinkProps> = ({
  className,
  target,
  children,
  ...props
}) => {
  const router = useRouter();
  const classnames = cx(className, "text-primary");

  const href = props.href || "";
  const path = href.toString();
  const { asPath } = router;

  const [isCurrentRoute, isSubRoute] = useMemo(() => {
    return [path === asPath, asPath.startsWith(path)];
  }, [asPath, path]);

  return (
    <NextLink {...props}>
      <a
        className={classnames}
        data-is-current={isCurrentRoute}
        data-is-subroute={isSubRoute}
        target={target}
      >
        {children}
      </a>
    </NextLink>
  );
};

Link.displayName = "Link";
