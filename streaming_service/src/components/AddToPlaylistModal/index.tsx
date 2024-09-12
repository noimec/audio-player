import { FC, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../store";
import {
  addTrackToPlaylist,
  selectPlaylists,
} from "../../store/playlistsSlice";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AddToPlaylistModalProps } from "../../types";
import { Button } from "../UI/Button";

export const AddToPlaylistModal: FC<AddToPlaylistModalProps> = ({
  isOpen,
  onClose,
  trackId,
}) => {
  const modalRoot = document.getElementById("modal-root");
  const playlists = useSelector(selectPlaylists);

  const dispatch: AppDispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (id: number) => {
    try {
      await dispatch(addTrackToPlaylist({ playlistId: id, trackId })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed add track to playlist", error);
    }
  };

  return createPortal(
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black/60"></div>
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[40px] z-50 bg-white rounded-[30px]"
      >
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl">Добавить в плейлист</h2>
          <ul className="flex flex-col mb-1">
            {playlists.map((playlist) => (
              <li
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(playlist.id);
                }}
                key={playlist.id}
                className="flex mb-3 items-center cursor-pointer hover:opacity-80 transition"
              >
                <img
                  className="w-[40px] h-[40px] mr-2"
                  src={
                    playlist.songs && playlist.songs[0]
                      ? playlist.songs[playlist.songs.length - 1].image
                      : "/images/default-cover.jpg"
                  }
                  alt={playlist.name}
                />
                <div className="flex flex-col">
                  <div className="text-sm">{playlist.name}</div>
                  <span className="text-xs text-[#AAAAAA]">
                    {playlist.songs && playlist.songs[0]
                      ? playlist.songs.length
                      : 0}{" "}
                    треков
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Button onClick={() => onClose()} variant="close" text="Отмена" />
        </div>
      </div>
    </>,
    modalRoot as HTMLElement
  );
};
