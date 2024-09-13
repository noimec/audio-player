import { FC, useRef, useState } from "react";
import cn from "classnames";

import { Button } from "../UI/Button";
import { RightArrowSvg } from "../../assets/svg";
import { ProfileDropdown } from "../ProfileDropdown";
import classNames from "classnames";

export const Profile: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleDropdownOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ left: buttonRect.left, top: buttonRect.top });
      setIsDropdownOpen(true);
    }
  };

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleDropdownOpen}
        className={cn(
          "outline-none transition focus-visible:outline-[#e8e8e8] rounded-[30px] overflow-hidden",
          "opacity-100 bg-[#e8e8e8]",
          "bg-[#f5f5f5] self-center p-[5px_13px] flex items-center max-w-[200px] w-[100%]",
          "hover:opacity-90 lg:ml-auto sm:bg-transparent sm:text-xs sm:p-0 sm:max-w-[max-content]"
        )}
        svg={<RightArrowSvg className={classNames("sm:hidden transition",isDropdownOpen && 'rotate-90')} />}
        image={
          <img
            className="w-11 h-11 rounded-full mr-3"
            src="/images/user.jpg"
            alt="Изображение пользователя"
          />
        }
      >
        <span className="mr-auto sm:m-0">Tatiana L.</span>
      </Button>
      {isDropdownOpen && (
        <ProfileDropdown
          isOpen={isDropdownOpen}
          position={dropdownPosition}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};
