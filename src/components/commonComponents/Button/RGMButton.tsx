import React from "react";
import { Button } from "@nextui-org/react";

export type RGMButtonProp = {
  isLoading?: boolean;
  btnText: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  classnames?: string;
  onclick?: (() => void) | ((e: React.FormEvent) => void);
  btnType?: "button" | "submit" | "reset";
};

const RGMButton: React.FC<RGMButtonProp> = ({
  btnText,
  classnames,
  endIcon,
  isLoading,
  startIcon,
  onclick,
  btnType,
}) => {
  return (
    <Button
      isLoading={isLoading}
      className={` ${classnames} text-[14px] lg:text-[16px] md:text-[16px] rounded-[6px] lg:rounded-[10px] md:rounded-[10px] `}
      startContent={startIcon && !isLoading && startIcon}
      endContent={endIcon && !isLoading && endIcon}
      onClick={onclick}
      type={btnType}
    >
      {isLoading ? "Loading..." : btnText}
    </Button>
  );
};

export default RGMButton;
