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
  text
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "aside" &&
          "text-xl py-1 px-2 transition focus:outline-none focus:bg-white hover:bg-white xl:min-w-max xl:inline-flex xl:rounded-[30px] sm:text-sm",
        variant === "aside" &&
          active &&
          "bg-white xl:bg-[#fc6d3e] xl:text-white",
        variant === "like" &&
          "transition group focus-visible:outline-none relative z-2",
        variant === "dropdown" &&
          "focus:outline-none focus:rounded-full focus:border-[#aaaaaa] group relative z-2 w-10 h-10 flex items-center justify-center rounded-full border border-transparent transition hover:border-[#aaaaaa]",
        variant === "dropdown" && active && "rotate-90",
        variant === "close" && "bg-[#fc6d3e] hover:bg-[#ee5d2c] hover:opacity-100 text-white p-2 rounded-lg opacity-90 self-end transition",
        variant === "submit" && "bg-blue-500 hover:bg-blue-700 hover:opacity-100 text-white p-2 rounded-lg opacity-90 self-end transition",
        variant === "menu" && "hover:bg-[#F5F5F5] hover:opacity-90 p-2 rounded-lg self-end w-full transition",
        className
      )}
    >
      {image}
      {children}
      {text}
      {svg}
    </button>
  );
};
