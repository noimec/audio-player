import { FC } from 'react';

import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import type { LayoutProps } from '../types/components/index.ts';

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
