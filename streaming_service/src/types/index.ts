import { ReactElement, ReactNode } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";

export type SwitchScreenType = "tracks" | "playlists"

export interface ITrack {
    selectedPlaylist?: IPlaylist | null;
    setSelectedPlaylist?: React.Dispatch<React.SetStateAction<IPlaylist | null>>
    index?: number
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

export type RegisterFormData = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type LoginFormData = {
    username: string;
    password: string;
};

export type FormData = RegisterFormData | LoginFormData;

export interface FormInputProps {
    id: keyof FormData;
    label: string;
    type: string;
    register: UseFormRegister<FormData>;
    error?: FieldError;
    validation:
    | {
        required: string;
        minLength?: undefined;
        pattern?: undefined;
    }
    | {
        required: string;
        minLength: {
            value: number;
            message: string;
        };
        pattern: {
            value: RegExp;
            message: string;
        };
    };
}

export interface TracksState {
    tracks: ITrack[];
    loading: boolean;
    error: string | null;
}

export interface PlaylistsState {
    playlists: IPlaylist[],
    loading: boolean,
    error: string | null,
}

export interface AuthState {
    token: string | null;
}


export interface TracksScreenProps {
    tracks: ITrack[];
    selectedPlaylist: IPlaylist | null;
    setSelectedPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | null>>
}

export interface PlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface PlaylistRemoveModalProps {
    isOpen: boolean;
    onClose: () => void;
    playlistId: number | null;
    name: string;
}

export interface AddToPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    trackId: number | null;
}

export interface LayoutProps {
    children: ReactNode;
}

export interface PlaylistsScreenProps {
    playlists: IPlaylist[];
}

export interface SidebarProps {
    playlists: IPlaylist[];
    onSwitchScreen: (screen: SwitchScreenType) => void;
    onPlaylistSelect: (playlist: IPlaylist) => void;
    onSelectAllTracks: () => void;
}

export interface TrackDropdownProps {
    selectedPlaylist?: IPlaylist | null;
    setSelectedPlaylist?: React.Dispatch<React.SetStateAction<IPlaylist | null>>
    isOpen: boolean;
    onClose: () => void;
    position: { top: number; left: number };
    trackId: number | null;
}

export interface IButton
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children?: ReactElement;
    className?: string;
    svg?: ReactNode;
    image?: ReactNode;
    variant?: "aside" | "like" | "dropdown";
    active?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ILink
    extends React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > {
    href: string;
    svg?: ReactNode;
    className?: string;
    children?: ReactElement;
}