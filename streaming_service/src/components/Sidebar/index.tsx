import { FC } from "react";
import cn from "classnames";

import { Button } from "../UI/Button";
import { PlaylistsSvg, SerachSvg, TracksSvg } from "../../assets/svg";
import { SwitchScreenType } from "../../types";

interface SidebarProps {
  onSwitchScreen: (screen: SwitchScreenType) => void;
}

const playlists = [
  { name: "Любимые" },
  { name: "Плейлист 1" },
  { name: "Плейлист 2" },
  { name: "Плейлист 3" },
  { name: "Плейлист 4" },
  { name: "Плейлист 5" },
];

export const Sidebar: FC<SidebarProps> = ({ onSwitchScreen }) => {
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
            onClick={() => onSwitchScreen("tracks")}
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
        </div>
        <ul className="text-xl flex flex-col xl:flex-row">
          {playlists.map((playlist, index) => (
            <Button key={index} variant="aside" className="w-full">
              <span>{playlist.name}</span>
            </Button>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
