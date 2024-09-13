import { FC } from "react";

import type { ILinkProps } from "../../../types/ui";

export const Link: FC<ILinkProps> = ({ href, svg, className, children, ...props }) => {
  return (
    <a className={className} href={href} {...props}>
      {svg}
      {children}
    </a>
  );
};