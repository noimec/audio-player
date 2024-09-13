import { ReactNode } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

export interface ITrack {
  index?: number;
  id: number;
  album: Album;
  artist: Artist;
  createdAt: string;
  duration: number;
  filename: string;
  image: string;
  likes: { id: number; username: string }[];
  name: string;
  path: string;
  isDropdownOpen?: boolean;
  onDropdownOpen?: () => void;
  onDropdownClose?: () => void;
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

export type SwitchScreenType = 'tracks' | 'playlists';

export interface IPlaylist {
  id: number;
  createdAt: string;
  name: string;
  user: User[];
  songs: ITrack[];
}

export interface User {
  firstName: string;
  id: number;
  lastName: string;
  username: string;
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

export interface AuthState {
  token: string | null;
}

export interface TracksScreenProps {
  tracks: ITrack[];
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
}

export interface TrackDropdownProps {
  isOpen: boolean;
  onClose: () => void | undefined;
  position: { top: number; left: number };
  trackId: number | null;
}

export interface ProfileDropdownProps {
  onClose: () => void;
  position: { top: number; left: number };
  isOpen: boolean;
}
