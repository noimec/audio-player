export type SwitchScreenType = "tracks" | "playlists"

export interface ITrack {
    id: number;
    album: Album;
    artist: Artist
    createdAt: string;
    duration: number;
    filename: string;
    image: string;
    likes: { id: number, username: string }[]
    name: string;
    path: string;
}

export interface Album {
    createdAt: string;
    id: number;
    image: string;
    name: string;
}

export interface Artist {
    createdAt: string;
    id: number;
    image: string;
    name: string;
}

export interface IPlaylist {
    id: number
    createdAt: string
    name: string
    user: User[]
    songs: ITrack[]
}

export interface User {
    firstName: string;
    id: number
    lastName: string
    username: string
}