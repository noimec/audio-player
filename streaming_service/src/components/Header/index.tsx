import { FC } from "react";
import cn from "classnames";

import { Link } from "../UI/Link";
import { LogoSvg } from "../../assets/svg";
import { useSearchInput } from "../../hooks/useSearchInput";
import { Profile } from "../Profile";

export const Header: FC = () => {
  const { handleInputChange, inputValue } = useSearchInput();

  return (
    <header className="flex pr-12 md:pr-1 sm:p-4 sm:flex-col">
      <Link
        className={cn(
          "focus-visible:outline-none max-w-[289px] w-[100%] xl:p-4 flex justify-center group",
          "items-center xl:px-11 lg:px-2 md:w-[150px] md:!p-1 xl:justify-start sm:p-0 sm:mr-auto"
        )}
        href="/"
        svg={<LogoSvg />}
      />
      <div
        className={cn(
          "pl-12 pt-4 pb-4 flex-1 mr-8 sm:left-0 sm:pl-0 sm:pr-0",
          "lg:pl-0 lg:w-full md:mr-0 lg:transition"
        )}
      >
        <input
          value={inputValue}
          onChange={handleInputChange}
          className={cn(
            "outline-none transition focus-visible:outline-[#e8e8e8] max-w-[1010px] border-none w-[100%]",
            'min-w-[250px] pt-4 pr-3 pb-4 pl-12 rounded-[30px] bg-[#f5f5f5] text-sm bg-[url("/images/search.svg")] bg-no-repeat bg-[left_15px_top_13px]',
            "placeholder:text-xs xl:hover:opacity-60 lg:bg-white lg:shadow-[2px_5px_35px_-18px] lg:h-14 lg:bg-[left_2%_center]"
          )}
          type="search"
          placeholder="ЧТО БУДЕМ ИСКАТЬ?"
        />
      </div>
      <Profile />
    </header>
  );
};
