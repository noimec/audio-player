import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../Sidebar";
import { IPlaylist, SwitchScreenType } from "../../types";
import { PlaylistsScreen } from "../PlaylistsScreen";
import { TracksScreen } from "../TracksScreen";
import { AppDispatch } from "../../store";
import {
  fetchTracks,
  selectTracks,
  selectTracksLoading,
} from "../../store/tracksSlice";
import {
  fetchPlaylists,
  selectPlaylists,
  selectPlaylistsLoading,
} from "../../store/playlistsSlice";

export const Main: FC = () => {
  const [screen, setScreen] = useState<SwitchScreenType>("tracks");
  const tracks = useSelector(selectTracks);

  const [selectedPlaylist, setSelectedPlaylist] = useState<IPlaylist | null>(
    null
  );

  const dispatch: AppDispatch = useDispatch();

  const tracksLoading = useSelector(selectTracksLoading);

  const playlists = useSelector(selectPlaylists);
  const playlistsLoading = useSelector(selectPlaylistsLoading);

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
        {screen === "tracks" && !tracksLoading && (
          <TracksScreen
            tracks={selectedPlaylist ? selectedPlaylist.songs : tracks}
          />
        )}
        {screen === "playlists" && !playlistsLoading && (
          <PlaylistsScreen playlists={playlists} />
        )}
      </div>
    </main>
  );
};
