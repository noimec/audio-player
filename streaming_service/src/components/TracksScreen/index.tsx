import { FC } from "react";

import { DataSvg, TimeSvg } from "../../assets/svg";
import { Track } from "../Track";
import { ITrack } from "../../types";

const tracks: ITrack[] = [
  {
    id: 1,
    image: "asdasd",
    name: "asfasf",
    createdAt: "asd",
    artist: { createdAt: "asf", id: 1, image: "saf", name: "asfsaf" },
    duration: 2132,
    album: { createdAt: "asf", id: 1, image: "asd", name: "asfasf" },
    likes: [],
    filename: "",
    path: "",
  },
  {
    id: 2,
    image: "qqqqqq",
    name: "qqq",
    createdAt: "qqq",
    artist: { createdAt: "asf", id: 1, image: "saf", name: "asfsaf" },
    duration: 2132,
    album: { createdAt: "asf", id: 1, image: "asd", name: "qqqqq" },
    likes: [],
    filename: "",
    path: "",
  },
  {
    id: 3,
    image: "wwwwwww",
    name: "www",
    createdAt: "www",
    artist: { createdAt: "asf", id: 1, image: "saf", name: "asfsaf" },
    duration: 2132,
    album: { createdAt: "asf", id: 1, image: "asd", name: "wwwww" },
    likes: [{ id: 1, username: "asf" }],
    filename: "",
    path: "",
  },
  {
    id: 4,
    image: "ddddd",
    name: "dddd",
    createdAt: "dddd",
    artist: { createdAt: "asf", id: 1, image: "saf", name: "asfsaf" },
    duration: 2132,
    album: { createdAt: "asf", id: 1, image: "asd", name: "dddd" },
    likes: [],
    filename: "",
    path: "",
  },
  {
    id: 5,
    image: "xxxx",
    name: "xxxxx",
    createdAt: "axxxxxsd",
    artist: { createdAt: "asf", id: 1, image: "saf", name: "asfsaf" },
    duration: 2132,
    album: { createdAt: "asf", id: 1, image: "asd", name: "xxxx" },
    likes: [{ id: 1, username: "asf" }],
    filename: "",
    path: "",
  },
];

export const TracksScreen: FC = () => {
  return (
    <section>
      <h2 className="text-3xl mb-1">Треки</h2>
      <div className="flex text-[#a4a4a4] text-xs items-center py-3 lg:hidden">
        <div className="w-full max-w-10">№</div>
        <div className="w-full max-w-[434px]">НАЗВАНИЕ</div>
        <div className="max-w-[363px] w-full xxl:max-w-[262px]">АЛЬБОМ</div>
        <div className="w-full max-w-[488px] mr-auto xxl:max-w-[239px]">
          <DataSvg />
        </div>
        <div className="w-full max-w-[200px] xxl:max-w-[99px]">
          <TimeSvg />
        </div>
      </div>
      <ul>
        {tracks.map((track) => (
          <Track {...track} key={track.id} />
        ))}
      </ul>
    </section>
  );
};
