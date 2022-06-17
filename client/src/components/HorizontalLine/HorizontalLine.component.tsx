import classNames from "classnames";
import React from "react";
import cx from "classnames";

type HorizontalLineProps = {
  textColor?: string;
  centerText?: string;
  backgroundColor?: string;
  height?: number;
  className?: string;
};

export const HorizontalLine: React.FC<HorizontalLineProps> = ({
  className,
  ...props
}) => {
  const classes = cx("flex", "items-center", className);
  return (
    <>
      <div className={classes}>
        <div className="flex-grow bg-gray-2 h-px"></div>
        {props.centerText && (
          <div className="flex-grow-0 mx-5 text text-xs text-neutral">
            {props.centerText}
          </div>
        )}
        <div className="flex-grow  bg-gray-2 h-px"></div>
      </div>
    </>
  );
};

HorizontalLine.displayName = "HorizontalLine";
