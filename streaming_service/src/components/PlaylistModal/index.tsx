import React, { FC, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { addPlaylist } from "../../store/playlistsSlice";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { PlaylistModalProps } from "../../types";
import { Button } from "../UI/Button";

export const PlaylistModal: FC<PlaylistModalProps> = ({ isOpen, onClose }) => {
  const modalRoot = document.getElementById("modal-root");

  const [playlistName, setPlaylistName] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addPlaylist({ name: playlistName })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to add playlist", error);
    }
  };

  return createPortal(
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black/60"></div>
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 z-50 bg-white rounded-[30px] sm:px-4"
      >
        <div>
          <h2 className="mb-4 text-2xl">Добавить плейлист</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="mb-4 border rounded-lg px-2 py-2 my-1 border-[#AAAAAA] min-w-[320px] sm:min-w-[270px]"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Введите название плейлиста"
              required
            />
            <div className="flex justify-between">
              <Button variant="submit" type="submit" text="Добавить" />
              <Button variant="close" onClick={() => onClose()} text="Отмена" />
            </div>
          </form>
        </div>
      </div>
    </>,
    modalRoot as HTMLElement
  );
};
