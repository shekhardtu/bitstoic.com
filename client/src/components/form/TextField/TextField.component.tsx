import React from "react";

import styles from "./TextField.module.scss";
import cx from "classnames";

type TextFieldOnlyProps = {
  /** has dark background? */
  hasDarkBg?: boolean;
  /** What label should be shown for this field? */
  label?: string | any;
  /** What is the helper text of the error state? */
  helperText?: string;
  /** has error? */
  hasError?: boolean;
  /** className for container */
  className?: string;
  /** is compact text field? */
  isCompact?: boolean;
  isHidden?: boolean;
};

export type TextFieldInputProps = TextFieldOnlyProps &
  React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A component to take user input using input element and provide feedback on the basis of user input
 */
export const TextField = React.forwardRef<
  HTMLInputElement,
  TextFieldInputProps
>((props, ref) => {
  const {
    hasDarkBg,
    label,
    className,
    helperText,
    hasError,
    placeholder = " ",
    isCompact = false,
    isHidden = false,
    ...rest
  } = props;

  const classes = cx("w-full", {
    hidden: isHidden,
  });
  return (
    <div className={classes}>
      <div className="text-sm mb-1">
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}
      </div>
      <div className="w-full">
        <input
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          placeholder={placeholder}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          className="border border-gray-2 p-3 rounded-md w-full box-border"
        />
        {helperText && <label className={styles.helper}>{helperText}</label>}
      </div>
    </div>
  );
});

TextField.displayName = "TextField";
