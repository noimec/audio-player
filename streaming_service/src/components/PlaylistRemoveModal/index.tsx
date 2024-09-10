import React, { FC, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { removePlaylist } from "../../store/playlistsSlice";
import { PlaylistRemoveModalProps } from "../../types";

export const PlaylistRemoveModal: FC<PlaylistRemoveModalProps> = ({
  isOpen,
  onClose,
  playlistId,
  name,
}) => {
  const modalRoot = document.getElementById("modal-root");

  const dispatch: AppDispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!playlistId) return;
      await dispatch(removePlaylist({ playlistId })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to remove playlist", error);
    }
  };

  return createPortal(
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black/20"></div>
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[50px] z-50 bg-white rounded-[30px]"
      >
        <div>
          <h2 className="mb-4 text-2xl">Удалить {name}?</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <button
                className="bg-[#fc6d3e] text-white p-2 rounded-lg mr-2"
                type="submit"
                onClick={(e) => e.stopPropagation()}
              >
                Удалить
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-lg opacity-90"
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
