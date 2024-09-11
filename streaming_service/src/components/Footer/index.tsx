import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { Button } from "../UI/Button";
import {
  PlayIcon,
  RepeatIcon,
  ShaffleIcon,
  SkipBackIcon,
  SkipNextIcon,
  VolumeIcon,
} from "../../assets/svg";
import { formatDuration } from "../../utils";
import { setSelectedTrack } from "../../store/playerTrackSlice";
import { selectTracks } from "../../store/tracksSlice";

export const Footer: FC = () => {
  const dispatch = useDispatch();
  const track = useSelector(
    (state: RootState) => state.playerTrack.selectedTrack
  );
  const tracks = useSelector(selectTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.src = `http://localhost:3000${track.path}`;
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    }
  }, [track]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const changeAudioToPlayhead = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && e.target) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  const skipToNextTrack = () => {
    if (track) {
      if (tracks.length === track.id) {
        dispatch(setSelectedTrack(tracks[0]));
      } else {
        dispatch(setSelectedTrack(tracks[track.id]));
      }
    }
  };

  const skipToPreviousTrack = () => {
    if (track) {
      if (track.id === 1) {
        dispatch(setSelectedTrack(tracks[tracks.length - 1]));
      } else {
        dispatch(setSelectedTrack(tracks[track.id - 2]));
      }
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
    if (audioRef.current) {
      audioRef.current.loop = !loop;
    }
  };

  if (!track) {
    return (
      <footer className="fixed bottom-0 left-0 w-full bg-white">
        No track selected
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white">
      <div className="px-5 py-7 flex justify-between">
        <div className="flex items-center max-w-[388px] w-full sm:max-w-full sm:pr-12">
          <img
            className="w-15 h-15 object-cover mr-3"
            src={track.image}
            alt={track.artist.name}
          />
          <div className="flex flex-col">
            <h3 className="mr-2">{track.name}</h3>
            <p className="text-xs text-[#AAAAAA]">{track.artist.name}</p>
          </div>
        </div>
        <div className="min-w-[680px] flex flex-col items-center justify-center">
          <div className="mb-3 flex justify-center">
            <Button svg={<ShaffleIcon className="w-5 h-5 mr-2" />} />
            <Button
              svg={<SkipBackIcon className="w-5 h-5 mr-2" />}
              onClick={skipToPreviousTrack}
            />
            <Button
              svg={<PlayIcon className="w-12 h-12" />}
              onClick={togglePlayPause}
            />
            <Button
              svg={<SkipNextIcon className="w-5 h-5 ml-2" />}
              onClick={skipToNextTrack}
            />
            <Button
              svg={<RepeatIcon className="w-5 h-5 ml-2" />}
              onClick={toggleLoop}
            />
          </div>
          <div className="w-full flex">
            <span>{formatDuration(currentTime * 1000)}</span>
            <input
              className="w-full mx-3"
              type="range"
              min="0"
              max={track.duration / 1000}
              defaultValue="0"
              value={currentTime}
              onInput={changeAudioToPlayhead}
            />
            <span>{formatDuration(track.duration)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <VolumeIcon className="w-5 h-5" />
          <input
            className="ml-2 bg-gray-700"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </footer>
  );
};
