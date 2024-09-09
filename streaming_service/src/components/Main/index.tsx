import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../Sidebar";
import { SwitchScreenType } from "../../types";
import { PlaylistsScreen } from "../PlaylistsScreen";
import { TracksScreen } from "../TracksScreen";
import { AppDispatch, RootState } from "../../store";
import {
  fetchTracks,
  selectTracks,
  selectTracksLoading,
} from "../../store/tracksSlice";
import { fetchPlaylists, selectPlaylists, selectPlaylistsLoading } from "../../store/playlistsSlice";

export const Main: FC = () => {
  const [screen, setScreen] = useState<SwitchScreenType>("tracks");

  const dispatch: AppDispatch = useDispatch();
  
  const token = useSelector((state: RootState) => state.auth.token);
  const tracks = useSelector(selectTracks);
  const tracksLoading = useSelector(selectTracksLoading);

  const playlists = useSelector(selectPlaylists);
  const playlistsLoading = useSelector(selectPlaylistsLoading);

  useEffect(() => {
    if (token) {
      dispatch(fetchTracks(token));
      dispatch(fetchPlaylists(token));
    }
  }, [token, dispatch]);

  const handleSwitchScreen = (variant: SwitchScreenType) => {
    setScreen(variant);
  };

  return (
    <main className="flex flex-1 xl:flex-col" id="content-layout">
      <Sidebar playlists={playlists} onSwitchScreen={handleSwitchScreen} />
      <div
        className="flex-1 block p-[35px_53px_145px_46px] sm:p-[0px_16px_145px_16px] sm:bg-[#f5f5f5]"
        id="main-layout"
      >
        {screen === "tracks" && !tracksLoading && <TracksScreen tracks={tracks} />}
        {screen === "playlists" && !playlistsLoading && <PlaylistsScreen playlists={playlists} />}
      </div>
    </main>
  );
};
