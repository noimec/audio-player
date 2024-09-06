import { FC, useState } from "react";

import { Sidebar } from "../Sidebar";
import { SwitchScreenType } from "../../types";
import { PlaylistsScreen } from "../PlaylistsScreen";
import { TracksScreen } from "../TracksScreen";

export const Main: FC = () => {
  const [screen, setScreen] = useState<SwitchScreenType>("tracks");

  const handleSwitchScreen = (variant: SwitchScreenType) => {
    setScreen(variant);
  };

  return (
    <main className="flex flex-1 xl:flex-col" id="content-layout">
      <Sidebar onSwitchScreen={handleSwitchScreen} />
      <div
        className="flex-1 block p-[35px_53px_145px_46px] sm:p-[0px_16px_145px_16px] sm:bg-[#f5f5f5]"
        id="main-layout"
      >
        {screen === "tracks" && <TracksScreen />}
        {screen === "playlists" && <PlaylistsScreen />}
      </div>
    </main>
  );
};
