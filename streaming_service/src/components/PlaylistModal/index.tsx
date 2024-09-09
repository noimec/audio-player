import React, { FC, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { addPlaylist } from "../../store/playlistsSlice";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlaylistModal: FC<PlaylistModalProps> = ({ isOpen, onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  const token = useSelector((state: RootState) => state.auth.token);

  const [playlistName, setPlaylistName] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is missing");
      return;
    }
    try {
      await dispatch(addPlaylist({ name: playlistName, token })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to add playlist", error);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black/60"></div>
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[50px] z-50 bg-white rounded-[30px]"
      >
        <div>
          <h2 className="mb-4 text-2xl">Добавить плейлист</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="mb-4 border rounded-lg px-2 py-2 my-1 border-[#AAAAAA] min-w-[320px]"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Введите название плейлиста"
              required
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                type="submit"
              >
                Добавить
              </button>
              <button
                className="bg-[#fc6d3e] text-white p-2 rounded-lg opacity-90"
                type="button"
                onClick={() => onClose()}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    modalRoot as HTMLElement
  );
};
