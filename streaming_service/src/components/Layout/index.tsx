import { FC } from "react";

import { Header } from "../Header";
import { LayoutProps } from "../../types";

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};
