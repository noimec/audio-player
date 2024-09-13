import { FC, useRef } from "react";
import cn from "classnames";

import { Button } from "../UI/Button";
import {
  PlayIcon,
  RepeatIcon,
  ShaffleIcon,
  SkipIcon,
  VolumeIcon,
} from "../../assets/svg";
import { formatDuration } from "../../utils";
import { useAudio } from "../../hooks/useAudio";

export const Footer: FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    changeAudioToPlayhead,
    currentTime,
    handleTimeUpdate,
    handleVolumeChange,
    skipToNextTrack,
    skipToPreviousTrack,
    toggleLoop,
    togglePlayPause,
    track,
    volume,
    isPlaying,
    loop,
    isMuted,
    toggleMute,
  } = useAudio(audioRef);

  if (!track) return;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white">
      <div className="px-5 py-7 flex justify-between sm:flex-col sm:items-center sm:px-4">
        <div className="flex items-center max-w-[260px] md:max-w-[150px] w-full sm:pr-12 sm:mb-2 sm:!max-w-[300px]">
          <img
            className="w-15 h-15 object-cover mr-3 md:h-11 md:w-11"
            src={track.image}
            alt={track.artist.name}
          />
          <div className="flex flex-col">
            <h3 className="mr-2">{track.name}</h3>
            <p className="text-xs text-[#AAAAAA]">{track.artist.name}</p>
          </div>
        </div>
        <div className="max-w-[800px] w-full flex flex-col items-center justify-between">
          <div className="mb-3 flex justify-center">
            <Button
              className="group"
              svg={
                <ShaffleIcon
                  fill="group-hover:fill-[#FC6D3E] transition transition-transform duration-300 ease-out group-hover:scale-110"
                  className="w-5 h-5 mr-2"
                />
              }
            />
            <Button
              className="group"
              svg={
                <SkipIcon
                  className="w-5 h-5 mr-2 rotate-180 transition-transform duration-300 ease-out group-hover:scale-110"
                  fill="group-hover:fill-[#FC6D3E] transition"
                />
              }
              onClick={skipToPreviousTrack}
            />
            <Button
              className="group relative flex justify-center items-center w-12 h-12"
              svg={
                <PlayIcon
                  className="w-12 h-12 transition-transform duration-300 ease-out group-hover:scale-110"
                  fill={cn(
                    "group-hover:fill-[#FC6D3E] transition-colors",
                    isPlaying && "fill-[#FC6D3E]"
                  )}
                />
              }
              onClick={togglePlayPause}
            />
            <Button
              className="group"
              svg={
                <SkipIcon
                  className="w-5 h-5 ml-2 transition-transform duration-300 ease-out group-hover:scale-110"
                  fill="group-hover:fill-[#FC6D3E] transition"
                />
              }
              onClick={skipToNextTrack}
            />
            <Button
              className="group"
              svg={
                <RepeatIcon
                  fill={cn(
                    "group-hover:fill-[#FC6D3E] transition transition-transform duration-300 ease-out group-hover:scale-110",
                    loop && "fill-[#FC6D3E]"
                  )}
                  className="w-5 h-5 ml-2"
                />
              }
              onClick={toggleLoop}
            />
          </div>
          <div className="w-full h-8 flex items-center group relative sm:px-2">
            <span className="sm:text-xs sm:-translate-x-2 absolute left-0 transform -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {formatDuration(currentTime * 1000)}
            </span>

            <input
              className="w-full mx-3"
              type="range"
              min="0"
              max={track.duration / 1000}
              value={currentTime}
              onInput={changeAudioToPlayhead}
            />

            <span className="sm:text-xs sm:translate-x-2 absolute right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {formatDuration(track.duration)}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            onClick={toggleMute}
            className="group"
            svg={
              <VolumeIcon
                fill={cn(
                  "group-hover:stroke-[#FC6D3E] transition-transform duration-300 ease-out group-hover:scale-110",
                  isMuted && "stroke-[#FC6D3E]"
                )}
                className="w-5 h-5"
              />
            }
          />
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
