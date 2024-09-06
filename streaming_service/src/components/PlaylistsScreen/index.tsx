import { FC } from "react";
import { IPlaylist } from "../../types";
import cn from "classnames";
import { Link } from "../UI/Link";

const playlists: IPlaylist[] = [
  {
    createdAt: "asf",
    id: 1,
    name: "safd",
    songs: [
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
    ],
    user: [],
  },
  {
    createdAt: "asf",
    id: 2,
    name: "safd",
    songs: [
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
    ],
    user: [],
  },
  {
    createdAt: "asf",
    id: 3,
    name: "safd",
    songs: [
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
    ],
    user: [],
  },
  {
    createdAt: "asf",
    id: 4,
    name: "safd",
    songs: [
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
    ],
    user: [],
  },
  {
    createdAt: "asf",
    id: 5,
    name: "safd",
    songs: [
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
    ],
    user: [],
  },
];

export const PlaylistsScreen: FC = () => {
  return (
    <section>
      <h2 className="text-3xl mb-1">Плейлисты</h2>
      <ul className="flex flex-wrap">
        {playlists.map(({ name, id, songs }) => (
          <li
            className={cn(
              "w-[calc((100%-90px)/4)] mb-7 not-nth-4n-mr30 relative xxl:not-nth-3n-mr0 lg:w-[calc((100%-60px)/3)] lg:not-nth-4n-mr0 lg:not-nth-3n-mr30",
              "md:w-[calc((100%-30px)/2)] md:not-nth-3n-mr0 md:not-nth-2n-mr30 sm:w-full sm:flex sm:items-center sm:mb-5 sm:bg-white sm:not-nth-2n-mr0"
            )}
            key={id}
          >
            <img
              className="w-full mb-5 sm:mb-0 sm:mr-5 sm:h-full sm:w-[99px]"
              src={songs[0].album.image}
              alt={name}
            />
            <div className="sm:flex-1">
              <h3 className="text-3xl font-medium mb-3 xxl:text-2xl sm:text-lg">
                <Link
                  className={cn(
                    "transition before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 focus-visible:outline-none",
                    "focus-visible:text-white focus-visible:bg-[#fc6d3e] active:opacity-50 xl:not-link-focus"
                  )}
                  href="#"
                >
                  <span>{name}</span>
                </Link>
              </h3>
              <span className="text-[#a4a4a4] font-bold sm:text-xs">
                {songs.length} треков
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
