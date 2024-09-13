import { ReactNode } from 'react';

export interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  className?: string;
  svg?: React.ReactNode;
  image?: React.ReactNode;
  text?: string;
  variant?: 'aside' | 'like' | 'dropdown' | 'close' | 'submit' | 'menu';
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ILinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  svg?: ReactNode;
  className?: string;
  children?: ReactNode;
}
