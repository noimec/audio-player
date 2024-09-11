import { FC, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "../UI/Button";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AddToPlaylistModal } from "../AddToPlaylistModal";
import { TrackDropdownProps } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { removeTrackInPlaylist } from "../../store/playlistsSlice";

export const TrackDropdown: FC<TrackDropdownProps> = ({
  isOpen,
  onClose,
  position,
  trackId,
  selectedPlaylist,
  setSelectedPlaylist,
}) => {
  const dropdownRoot = document.getElementById("dropdown-root");
  const dispatch: AppDispatch = useDispatch();
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, onClose, isOpen);

  if (!isOpen) return null;

  const handleRemoveTrackInPlaylists = async () => {
    if (!selectedPlaylist || trackId === null) {
      console.error("No playlist selected or track ID is invalid");
      return;
    }
    try {
      const updatedPlaylists = await dispatch(
        removeTrackInPlaylist({
          playlistId: selectedPlaylist.id,
          trackId: trackId,
        })
      ).unwrap();
      setSelectedPlaylist(updatedPlaylists);
      onClose();
    } catch (error) {
      console.error("Failed remove track in playlist", error);
    }
  };

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
        className="mb-1"
        onClick={(e) => {
          e.stopPropagation();
          setIsAddToPlaylistModalOpen(true);
        }}
      >
        <span>Добавить в плейлист</span>
      </Button>
      {selectedPlaylist && (
        <Button onClick={handleRemoveTrackInPlaylists}>
          <span>Удалить из плейлиста</span>
        </Button>
      )}
      <AddToPlaylistModal
        trackId={trackId}
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
      />
    </div>,
    dropdownRoot as HTMLElement
  );
};
