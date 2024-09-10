import cn from "classnames";
import { FC } from "react";

import { IButton } from "../../../types";

export const Button: FC<IButton> = ({
  children,
  svg,
  className,
  image,
  variant,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "aside" &&
          "text-xl mb-3 transition focus:outline-none focus:bg-white xl:hover:bg-white xl:min-w-max xl:inline-flex xl:rounded-[30px] sm:text-sm",
        variant === "aside" &&
          active &&
          "bg-white xl:bg-[#fc6d3e] xl:text-white",
        variant === "like" &&
          "transition group focus-visible:outline-none relative z-2",
        variant === "dropdown" &&
          "focus:outline-none focus:rounded-full focus:border-[#aaaaaa] group relative z-2 w-10 h-10 flex items-center justify-center rounded-full border border-transparent transition xl:hover:border-[#aaaaaa]",
        variant === "dropdown" && active && "rotate-90",
        className
      )}
    >
      {image}
      {children}
      {svg}
    </button>
  );
};
