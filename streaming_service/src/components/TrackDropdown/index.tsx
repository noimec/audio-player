import { FC, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "../UI/Button";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AddToPlaylistModal } from "../AddToPlaylistModal";
import { TrackDropdownProps } from "../../types";

export const TrackDropdown: FC<TrackDropdownProps> = ({
  isOpen,
  onClose,
  position,
  trackId,
}) => {
  const dropdownRoot = document.getElementById("dropdown-root");
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, onClose, isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="flex fixed flex-col z-30 -translate-x-[80px] translate-y-1 bg-white rounded-md p-3 border"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      ref={dropdownRef}
    >
      <Button
        className="mb-2"
        onClick={(e) => {
            e.stopPropagation()
            setIsAddToPlaylistModalOpen(true)
        }}
      >
        <span>Добавить в плейлист</span>
      </Button>
      <Button>
        <span>Удалить из плейлиста</span>
      </Button>
      <AddToPlaylistModal
        trackId={trackId}
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
      />
    </div>,
    dropdownRoot as HTMLElement
  );
};
