import { FC, useState } from "react";
import cn from "classnames";

import { Button } from "../UI/Button";
import {
  AddPlaylistIcon,
  PlaylistsSvg,
  RemoveIcon,
  TracksSvg,
} from "../../assets/svg";
import { PlaylistModal } from "../PlaylistModal";
import { PlaylistRemoveModal } from "../PlaylistRemoveModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setScreen } from "../../store/screenSlice";
import { setViewedPlaylist } from "../../store/selectedPlaylistSlice";
import type { IPlaylist, SidebarProps } from "../../types/components";

export const Sidebar: FC<SidebarProps> = ({ playlists }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null
  );

  const dispatch: AppDispatch = useDispatch();

  const onPlaylistSelect = (playlist: IPlaylist) => {
    dispatch(setViewedPlaylist(playlist));
    dispatch(setScreen("tracks"));
  };

  return (
    <aside className="bg-[#f5f5f5] max-w-[289px] w-full overflow-auto xl:max-w-[100%] sm:px-4 sm:py-5">
      <h2 className="absolute w-[1px] h-[1px] p-0 border-none overflow-hidden">
        Левая панель навигации
      </h2>
      <nav className="lg:flex lg:items-center px-5 py-8 sm:p-0">
        <div className="flex flex-col mb-5 items-start lg:mr-5">
          <Button
            onClick={() => {
              dispatch(setScreen("tracks"));
              dispatch(setViewedPlaylist(null));
            }}
            text="Треки"
            variant="aside"
            className="flex-row-reverse w-full"
            svg={
              <TracksSvg
                className="sm:w-4 mr-3 transition hover:scale-110"
                path={cn("xl:stroke-wthite")}
              />
            }
          />
          <Button
            onClick={() => dispatch(setScreen("playlists"))}
            variant="aside"
            className="flex-row-reverse w-full"
            text="Плейлисты"
            svg={
              <PlaylistsSvg
                className="sm:w-4 mr-3 transition hover:scale-110"
                path={cn("xl:stroke-wthite")}
              />
            }
          />
          <Button
            className="flex-row-reverse w-full"
            variant="aside"
            text="Добавить плейлист"
            svg={
              <AddPlaylistIcon className="mr-3 transition hover:scale-110" />
            }
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          />

          {isModalOpen && (
            <PlaylistModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
        </div>
        <ul className="text-xl flex flex-col xl:flex-row">
          {playlists.map((playlist) => (
            <div key={playlist.id}>
              <Button
                variant="aside"
                className="w-full justify-between text-lg text-[#11253D] xl:gap-1 xl:mr-2"
                onClick={() => onPlaylistSelect(playlist)}
                text={playlist.name}
                svg={
                  <RemoveIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaylistId(playlist.id);
                      setRemoveModalOpen(true);
                    }}
                  />
                }
              />
              {isRemoveModalOpen && (
                <PlaylistRemoveModal
                  name={
                    playlists.find(
                      (playlist) => playlist.id === selectedPlaylistId
                    )?.name || ""
                  }
                  playlistId={selectedPlaylistId}
                  isOpen={isRemoveModalOpen}
                  onClose={() => setRemoveModalOpen(false)}
                />
              )}
            </div>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
