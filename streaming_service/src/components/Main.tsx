import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../store';
import { Sidebar } from './Sidebar';
import { PlaylistsScreen } from './PlaylistScreen';
import { TracksScreen } from './TrackScreen';
import { fetchTracks, selectTracks } from '../store/tracksSlice';
import { fetchPlaylists, selectPlaylists } from '../store/playlistsSlice';
import { selectScren } from '../store/screenSlice';
import { selectViewedPlaylist } from '../store/selectedPlaylistSlice';
import { selectFilteredTracks } from '../store/filteredTracksSlise';

export const Main: FC = () => {
  const selectedPlaylist = useSelector(selectViewedPlaylist);
  const screen = useSelector(selectScren);
  const tracks = useSelector(selectTracks);
  const playlists = useSelector(selectPlaylists);
  const filteredTracks = useSelector(selectFilteredTracks);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchPlaylists());
  }, [dispatch]);

  return (
    <main className="flex flex-1 xl:flex-col">
      <Sidebar playlists={playlists} />
      <div className="flex-1 block p-[35px_53px_145px_46px] sm:p-[0px_16px_145px_16px] sm:bg-[#f5f5f5]">
        {screen === 'tracks' && (
          <TracksScreen
            tracks={
              selectedPlaylist
                ? selectedPlaylist.songs
                : filteredTracks?.length
                  ? filteredTracks
                  : tracks
            }
          />
        )}
        {screen === 'playlists' && <PlaylistsScreen playlists={playlists} />}
      </div>
    </main>
  );
};
