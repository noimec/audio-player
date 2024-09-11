import { FC } from "react";

import { Header } from "../Header";
import { LayoutProps } from "../../types";
import { Footer } from "../Footer/index.tsx";

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
