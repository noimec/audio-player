import { FC, useState } from "react";
import cn from "classnames";

import { Button } from "../UI/Button";
import {
  AddPlaylistIcon,
  PlaylistsSvg,
  RemoveIcon,
  SerachSvg,
  TracksSvg,
} from "../../assets/svg";
import { SidebarProps } from "../../types";
import { PlaylistModal } from "../PlaylistModal";
import { PlaylistRemoveModal } from "../PlaylistRemoveModal";

export const Sidebar: FC<SidebarProps> = ({
  playlists,
  onSwitchScreen,
  onPlaylistSelect,
  onSelectAllTracks,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null
  );

  return (
    <aside className="bg-[#f5f5f5] max-w-[289px] w-full overflow-auto xl:max-w-[100%] xl:px-11 xl:py-5 sm:px-4 sm:py-5">
      <h2 className="absolute w-[1px] h-[1px] p-0 border-none overflow-hidden">
        Левая панель навигации
      </h2>
      <nav className="lg:flex lg:items-center px-5 py-8">
        <Button
          className="none lg:flex lg:bg-white lg:min-w-11 lg:w-full lg:rounded-full lg:justify-center lg:items-center lg:mr-5"
          svg={<SerachSvg />}
        />
        <div className="flex flex-col mb-5">
          <Button
            onClick={() => {
              onSwitchScreen("tracks");
              onSelectAllTracks();
            }}
            variant="aside"
            svg={
              <TracksSvg
                className="sm:w-4 ml-3"
                path={cn("xl:stroke-wthite")}
              />
            }
          >
            <span>Треки</span>
          </Button>
          <Button
            onClick={() => onSwitchScreen("playlists")}
            variant="aside"
            svg={
              <PlaylistsSvg
                className="sm:w-4 ml-3"
                path={cn("xl:stroke-wthite")}
              />
            }
          >
            <span>Плейлисты</span>
          </Button>
          <Button
            variant="aside"
            svg={<AddPlaylistIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            <span className="mr-2">Добавить плейлист</span>
          </Button>

          <PlaylistModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
        <ul className="text-xl flex flex-col xl:flex-row">
          {playlists.map((playlist) => (
            <div key={playlist.id}>
              <Button
                variant="aside"
                className="w-full"
                onClick={() => onPlaylistSelect(playlist)}
                svg={
                  <RemoveIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaylistId(playlist.id);
                      setRemoveModalOpen(true);
                    }}
                  />
                }
              >
                <span className="mr-auto">{playlist.name}</span>
              </Button>
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
            </div>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
