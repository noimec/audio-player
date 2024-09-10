import { FC } from "react";

import { ILink } from "../../../types";

export const Link: FC<ILink> = ({ href, svg, className, children }) => {
  return (
    <a className={className} href={href}>
      {svg}
      {children}
    </a>
  );
};
