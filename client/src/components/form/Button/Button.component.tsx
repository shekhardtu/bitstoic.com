import React from "react";
import cx from "classnames";

import { Icon, IconSize, IconType } from "components";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "tertiary-link"
  | "custom"
  | "dark"
  | "light";

export type ButtonTypeOf = "regular" | "google" | "linkedin" | "twitter";

export type ButtonStyleProps = {
  /** How large should the button be? */
  size?: ButtonSize;
  /** Which variant of the button should it have? */
  state?: ButtonVariant;

  /** Either it is social or regular button */
  typeOf?: ButtonTypeOf;
  /** has dark background? */
  hasDarkBg?: boolean;
  /** Does this button cover 100% width of its parent? (100%) */
  isFullWidth?: boolean;
  /** Which optional icon to be rendered before the children node? */
  iconType?: string;
  /** What is the size of icon? */
  iconSize?: IconSize;
  /** isLoading? */
  isLoading?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** is compact button? */
  isCompact?: boolean;
  // Class names from props
  classNames?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps;

/**
 * A component to render button element of different sizes and states
 */
export const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      size = "large",
      hasDarkBg = false,
      isFullWidth = false,
      state = "primary",
      isLoading = false,
      iconType,
      iconSize = "medium",
      typeOf = "regular",
      isCompact = false,
      isDisabled = false,
      children,
      classNames,
      ...props
    },
    ref
  ) => {
    const isDisabledState = isDisabled || isLoading;
    const classnames = cx(
      classNames,
      "rounded-md",
      "hover:bg-indigo-700",
      "hover:-translate-y-1",
      "transition-all",
      "duration-500",
      "font-semibold",
      {
        "w-full": isFullWidth,
        "bg-primary text-white": state == "primary",
        "opacity-75 cursor-not-allowed": isDisabled,
        "cursor-progress opacity-75": isLoading,
        "border border-gray-2 text-neutral": state == "light",
      }
    );

    return (
      <button
        ref={ref}
        className={classnames}
        {...props}
        disabled={isDisabledState}
      >
        <div className="flex justify-around flex-row">
          {isLoading ? (
            <>
              <div className="flex justify-center grow">
                <Icon iconType={IconType.SPINNER} size={size} />
              </div>
              <div className="flex justify-start grow"> Processing...</div>
            </>
          ) : iconType ? (
            <>
              <div className="flex justify-center grow">
                <Icon
                  iconType={IconType[iconType as keyof typeof IconType]}
                  size={iconSize}
                />
              </div>
              <div className="flex justify-start grow">{children}</div>
            </>
          ) : (
            children
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";
