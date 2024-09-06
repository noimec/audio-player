import { FC, ReactNode } from "react";

import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div id="over-layout" className="relative overflow-hidden">
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};
