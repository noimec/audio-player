import { FC } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from './ui/link';
import { AppDispatch } from '../store';
import { selectPlaylists } from '../store/playlistsSlice';
import { setViewedPlaylist } from '../store/selectedPlaylistSlice';
import { setScreen } from '../store/screenSlice';
import type { PlaylistsScreenProps } from '../types/components';

export const PlaylistsScreen: FC<PlaylistsScreenProps> = ({ playlists }) => {
  const dispatch: AppDispatch = useDispatch();
  const allPlaylists = useSelector(selectPlaylists);

  const handlePlaylistOpen = (id: number) => {
    const currentPlaylist = allPlaylists.find((playlist) => playlist.id === id);
    dispatch(setScreen('tracks'));
    dispatch(setViewedPlaylist(currentPlaylist));
  };

  return (
    <section>
      <h2 className="text-3xl mb-1 sm:pt-3">Плейлисты</h2>
      <ul className="flex flex-wrap sm:flex-col">
        {playlists.map(({ name, id, songs }) => (
          <li
            onClick={() => handlePlaylistOpen(id)}
            className={cn(
              'w-[calc((100%-90px)/4)] hover:opacity-90 transition mb-7 not-nth-4n-mr30 relative xxl:not-nth-3n-mr0 lg:w-[calc((100%-60px)/3)] lg:not-nth-4n-mr0 lg:not-nth-3n-mr30',
              'md:w-[calc((100%-30px)/2)] md:not-nth-3n-mr0 md:not-nth-2n-mr30 sm:w-full sm:flex sm:items-center sm:mb-5 sm:bg-white sm:not-nth-2n-mr0',
            )}
            key={id}
          >
            <img
              className="w-full mb-5 sm:mb-0 sm:mr-5 sm:h-full sm:w-[99px]"
              src={
                songs && songs[0]
                  ? songs[songs.length - 1].image
                  : '/images/default-cover.jpg'
              }
              alt={name}
            />
            <div className="sm:flex-1">
              <h3 className="text-3xl font-medium mb-3 xxl:text-2xl sm:text-lg">
                <Link
                  className={cn(
                    "transition before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 focus-visible:outline-none",
                    'focus-visible:text-white focus-visible:bg-[#fc6d3e] active:opacity-50 xl:not-link-focus',
                  )}
                  href="#"
                >
                  <span>{name}</span>
                </Link>
              </h3>
              <span className="text-[#a4a4a4] font-bold sm:text-xs">
                {songs && songs.length ? songs.length : 0} треков
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
