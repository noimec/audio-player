import type { FieldError, UseFormRegister } from "react-hook-form";

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