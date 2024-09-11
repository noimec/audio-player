import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../Sidebar";
import { IPlaylist, SwitchScreenType } from "../../types";
import { PlaylistsScreen } from "../PlaylistsScreen";
import { TracksScreen } from "../TracksScreen";
import { AppDispatch } from "../../store";
import { fetchTracks, selectTracks } from "../../store/tracksSlice";
import { fetchPlaylists, selectPlaylists } from "../../store/playlistsSlice";

export const Main: FC = () => {
  const [screen, setScreen] = useState<SwitchScreenType>("tracks");
  const [selectedPlaylist, setSelectedPlaylist] = useState<IPlaylist | null>(
    null
  );

  const tracks = useSelector(selectTracks);
  const playlists = useSelector(selectPlaylists);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const handleSwitchScreen = (variant: SwitchScreenType) => {
    setScreen(variant);
  };

  const handlePlaylistSelect = (playlist: IPlaylist) => {
    setSelectedPlaylist(playlist);
    setScreen("tracks");
  };

  return (
    <main className="flex flex-1 xl:flex-col">
      <Sidebar
        onSelectAllTracks={() => setSelectedPlaylist(null)}
        onPlaylistSelect={handlePlaylistSelect}
        playlists={playlists}
        onSwitchScreen={handleSwitchScreen}
      />
      <div className="flex-1 block p-[35px_53px_145px_46px] sm:p-[0px_16px_145px_16px] sm:bg-[#f5f5f5]">
        {screen === "tracks" && (
          <TracksScreen
            setSelectedPlaylist={setSelectedPlaylist}
            selectedPlaylist={selectedPlaylist}
            tracks={selectedPlaylist ? selectedPlaylist.songs : tracks}
          />
        )}
        {screen === "playlists" && <PlaylistsScreen playlists={playlists} />}
      </div>
    </main>
  );
};
