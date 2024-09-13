import { IPlaylist, ITrack, SwitchScreenType } from "../types/components";

export interface FilteredTracksState {
    tracks: ITrack[] | null;
}

export interface PlayerTrackState {
    selectedTrack: ITrack | null;
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

export interface ScreenSliceState {
    screen: SwitchScreenType;
}

export interface SelectedPlaylistState {
    currentPlaylist: IPlaylist | null;
    viewedPlaylist: IPlaylist | null;
}