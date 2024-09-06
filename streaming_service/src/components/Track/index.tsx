import { FC } from "react";
import { Button } from "../UI/Button";
import { DropdownSvg, LikeSvg } from "../../assets/svg";
import { Link } from "../UI/Link";
import cn from "classnames";
import { ITrack } from "../../types";

export const Track: FC<ITrack> = ({
    id,
    name,
    artist,
    image,
    album,
    duration,
    createdAt,
  }) => {
  return (
    <li
      className="flex relative py-4 items-center sm:bg-white sm:py-0 sm:mb-5"
    >
      <div className="w-full max-w-10 sm:hidden">{id}</div>
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
                "xl:text-[#fc6d3e] hover:before:border-[#fc6d3e] sm:text-lg sm:before:border-none"
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
      <div className="max-w-[363px] w-full pr-5 whitespace-nowrap overflow-hidden text-ellipsis xxl:max-w-[262px] lg:flex-4 lg:max-w-none">
        {album.name}
      </div>
      <div className="flex w-full max-w-[488px] pr-3 mr-auto text-[#a4a4a4] font-bold xxl:max-w-[230px] lg:flex-4 lg:max-w-none">
        <span className="mr-auto lg:hidden">{createdAt}</span>
        <Button variant="like" svg={<LikeSvg active={false} />} />
      </div>
      <time className="w-full max-w-[157px] xxl:max-w-[56px] lg:hidden">
        {duration}
      </time>
      <div className="w-full max-w-11 relative">
        <Button variant="dropdown" svg={<DropdownSvg />} />
      </div>
    </li>
  );
};
