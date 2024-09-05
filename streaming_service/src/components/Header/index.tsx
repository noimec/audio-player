import { FC } from "react";
import { Link } from "../UI/Link";
import { LogoSvg } from "../../assets/svg";

export const Header: FC = () => {
  return (
    <header className="flex pr-12">
      <Link href="#" svg={<LogoSvg />} />
    </header>
  );
};
