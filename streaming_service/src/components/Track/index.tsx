import { FC, useMemo, useRef, useState } from "react";
import cn from "classnames";

import { Button } from "../UI/Button";
import { DropdownSvg, LikeSvg } from "../../assets/svg";
import { Link } from "../UI/Link";
import { TrackDropdown } from "../TrackDropdown";
import { formatDuration, timeAgo } from "../../utils";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setLikeTrack, setUnlikeTrack } from "../../store/tracksSlice";
import { setSelectedTrack } from "../../store/playerTrackSlice";
import {
  selectViewedPlaylist,
  setCurrentPlaylist,
} from "../../store/selectedPlaylistSlice";
import type { ITrack } from "../../types/components";

export const Track: FC<ITrack> = ({
  id,
  name,
  artist,
  image,
  album,
  duration,
  createdAt,
  index,
  likes,
  filename,
  path,
  isDropdownOpen,
  onDropdownOpen,
  onDropdownClose,
}) => {
  const [localLikes, setLocalLikes] = useState(likes.length);
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const selectedPlaylist = useSelector(selectViewedPlaylist);

  const formattedDuration = useMemo(() => formatDuration(duration), [duration]);
  const formattedTimeAgo = useMemo(() => timeAgo(createdAt), [createdAt]);

  const handleSelectTrack = () => {
    dispatch(
      setSelectedTrack({
        id,
        name,
        artist,
        image,
        album,
        duration,
        createdAt,
        likes,
        filename,
        path,
      })
    );
  };

  const handleDropdownOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom,
        left: buttonRect.left,
      });
    }
    setSelectedTrackId(id);
    onDropdownOpen!();
  };

  const onToggleLikeTrack = async () => {
    const previousLikes = localLikes;
    try {
      if (!localLikes) {
        setLocalLikes(1);
        await dispatch(setLikeTrack({ trackId: id })).unwrap();
      } else {
        setLocalLikes(0);
        await dispatch(setUnlikeTrack({ trackId: id })).unwrap();
      }
    } catch (error) {
      console.error("Failed to toggle like/unlike track", error);
      setLocalLikes(previousLikes);
    }
  };

  return (
    <li
      onClick={() => {
        dispatch(setCurrentPlaylist(selectedPlaylist));
        handleSelectTrack();
      }}
      className="flex relative py-4 items-center sm:bg-white sm:py-0 sm:mb-5"
    >
      <div className="w-full max-w-10 md:max-w-4 sm:hidden">{index}</div>
      <div className="max-w-[434px] pr-3 w-full items-center flex lg:max-w-none lg:flex-8">
        <img
          className="w-16 h-16 object-cover object-center mr-3"
          src={image}
          alt={name}
        />
        <div className="sm:py-1">
          <h3 className="mb-3 sm:mb-1">
            <Link
              className={cn(
                'transition before:transition focus:text-[#fc6d3e] focus:before:border-[#fc6d3e] focus-visible:outline-none before:content-[""] before:absolute',
                "before:top-0 before:left-0 before:right-0 before:bottom-0 before:border-t-[1px] before:border-b-[1px] before:border-t-[#e8e8e8] before:border-b-[#e8e8e8]",
                " hover:before:border-[#fc6d3e] sm:text-lg sm:before:border-none"
              )}
              href="#"
            >
              <span>{name}</span>
            </Link>
          </h3>
          <span className="text-[#a4a4a4] font-medium text-xs">
            {artist.name}
          </span>
        </div>
      </div>
      <div className="max-w-[363px] w-full pr-5 whitespace-nowrap overflow-hidden text-ellipsis xxl:max-w-[262px] lg:flex-4 lg:max-w-none sm:hidden">
        {album.name}
      </div>
      <div className="flex w-full max-w-[488px] md:w-[50px] pr-3 mr-auto text-[#a4a4a4] font-bold xxl:max-w-[230px] lg:flex-4 lg:max-w-none">
        <span className="mr-auto lg:hidden">{formattedTimeAgo}</span>
        <Button
          variant="like"
          onClick={onToggleLikeTrack}
          svg={<LikeSvg active={!localLikes ? false : true} />}
        />
      </div>
      <time className="w-full max-w-[157px] xxl:max-w-[56px] lg:hidden">
        {formattedDuration}
      </time>
      <div className="w-full max-w-11 relative" ref={buttonRef}>
        <Button
          onClick={handleDropdownOpen}
          variant="dropdown"
          className="group"
          svg={<DropdownSvg />}
        />
        {isDropdownOpen && onDropdownClose && (
          <TrackDropdown
            trackId={selectedTrackId}
            isOpen={isDropdownOpen}
            onClose={onDropdownClose}
            position={dropdownPosition}
          />
        )}
      </div>
    </li>
  );
};
