import { FC, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "../UI/Button";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AddToPlaylistModal } from "../AddToPlaylistModal";
import { TrackDropdownProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { removeTrackInPlaylist } from "../../store/playlistsSlice";
import {
  selectSelectedPlaylist,
  setSelectedPlaylist,
} from "../../store/selectedPlaylistSlice";

export const TrackDropdown: FC<TrackDropdownProps> = ({
  isOpen,
  onClose,
  position,
  trackId,
}) => {
  const dropdownRoot = document.getElementById("dropdown-root");
  const dispatch: AppDispatch = useDispatch();
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

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
      dispatch(setSelectedPlaylist(updatedPlaylists));
      onClose();
    } catch (error) {
      console.error("Failed remove track in playlist", error);
    }
  };

  return createPortal(
    <div
      className="flex fixed flex-col z-30 -translate-x-[95px] translate-y-1 bg-white rounded-md p-3 border sm:-translate-x-[135px]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      ref={dropdownRef}
    >
      <Button
        variant="menu"
        text="Добавить в плейлист"
        onClick={(e) => {
          e.stopPropagation();
          setIsAddToPlaylistModalOpen(true);
        }}
      />
      {selectedPlaylist && (
        <Button
          variant="menu"
          text="Удалить из плейлиста"
          onClick={handleRemoveTrackInPlaylists}
        />
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
