import { FC } from "react";

import { Header } from "../Header";
import { Footer } from "../Footer/index.tsx";
import type { LayoutProps } from "../../types/components/index.ts";

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
