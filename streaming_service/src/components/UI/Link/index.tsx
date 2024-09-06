import { FC, ReactElement, ReactNode } from "react";

interface ILink
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  svg?: ReactNode;
  className?: string;
  children?: ReactElement;
}

export const Link: FC<ILink> = ({ href, svg, className, children }) => {
  return (
    <a className={className} href={href}>
      {svg}
      {children}
    </a>
  );
};
