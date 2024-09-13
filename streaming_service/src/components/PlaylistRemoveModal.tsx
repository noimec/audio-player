import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { removePlaylist } from '../store/playlistsSlice';
import { Button } from './ui/button';
import type { PlaylistRemoveModalProps } from '../types/components';

export const PlaylistRemoveModal: FC<PlaylistRemoveModalProps> = ({
  isOpen,
  onClose,
  playlistId,
  name,
}) => {
  const modalRoot = document.getElementById('modal-root');

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
      console.error('Failed to remove playlist', error);
    }
  };

  return createPortal(
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black/20"></div>
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 z-50 bg-white rounded-[30px] sm:p-"
      >
        <div>
          <h2 className="mb-4 text-2xl sm:text-xl">Удалить {name}?</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <Button
                onClick={(e) => e.stopPropagation()}
                type="submit"
                variant="submit"
                text="Удалить"
                className="sm:mr-2"
              />
              <Button onClick={() => onClose()} variant="close" text="Отмена" />
            </div>
          </form>
        </div>
      </div>
    </>,
    modalRoot as HTMLElement,
  );
};
