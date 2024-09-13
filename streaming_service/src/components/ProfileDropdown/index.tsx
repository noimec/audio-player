import { FC, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Button } from "../UI/Button";
import { ProfileDropdownProps } from "../../types";
import { deleteCookie } from "../../utils";

export const ProfileDropdown: FC<ProfileDropdownProps> = ({
  onClose,
  position,
  isOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileDropdownRoot = document.getElementById("dropdown-profile");
  const navigate = useNavigate();

  useOutsideClick(dropdownRef, onClose, isOpen);

  if (!profileDropdownRoot) return;

  return createPortal(
    <div
      ref={dropdownRef}
      className="flex fixed px-4 py-2 translate-x-[100px] translate-y-[55px] bg-white border-[2px] rounded-lg border-[#f5f5f5]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <Button
        variant="menu"
        text="Выйти"
        onClick={() => {
          deleteCookie("__session");
          navigate("/auth");
        }}
      />
    </div>,
    profileDropdownRoot
  );
};
