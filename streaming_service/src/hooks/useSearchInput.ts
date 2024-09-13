import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppDispatch } from '../store';
import { selectTracks } from '../store/tracksSlice';
import useDebounce from './useDebounce';
import {
  clearFilteredTracks,
  setFilteredTracks,
} from '../store/filteredTracksSlise';

export const useSearchInput = () => {
  const tracks = useSelector(selectTracks);
  const [inputValue, setInputValue] = useState('');

  const debouncedInputValue = useDebounce(inputValue, 300);

  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!debouncedInputValue) {
      dispatch(clearFilteredTracks());
    } else {
      const filteredTracks = tracks.filter((track) => {
        const matchesName = track.name
          .toLowerCase()
          .includes(debouncedInputValue.toLowerCase());
        const matchesArtistName = track.artist.name
          .toLowerCase()
          .includes(debouncedInputValue.toLowerCase());
        const matchesAlbumName = track.album.name
          .toLowerCase()
          .includes(debouncedInputValue.toLowerCase());

        return matchesAlbumName || matchesArtistName || matchesName;
      });
      dispatch(setFilteredTracks(filteredTracks));
    }
  }, [debouncedInputValue, tracks, dispatch]);

  return { handleInputChange, inputValue };
};
