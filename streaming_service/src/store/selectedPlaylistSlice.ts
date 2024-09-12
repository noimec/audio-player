import { createSlice } from "@reduxjs/toolkit";

import { IPlaylist } from "../types";
import { RootState } from ".";

interface SelectedPlaylistState {
    currentPlaylist: IPlaylist | null;
    viewedPlaylist: IPlaylist | null;
}

const initialState: SelectedPlaylistState = {
    currentPlaylist: null,
    viewedPlaylist: null,
};

const selectedPlaylistSlice = createSlice({
    name: "selectedPlaylist",
    initialState,
    reducers: {
        setCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload;
        },
        setViewedPlaylist: (state, action) => {
            state.viewedPlaylist = action.payload;
        },
    },
});

export const { setCurrentPlaylist, setViewedPlaylist } = selectedPlaylistSlice.actions;

export const selectCurrentPlaylist = (state: RootState) => state.selectedPlaylist.currentPlaylist;
export const selectViewedPlaylist = (state: RootState) => state.selectedPlaylist.viewedPlaylist;

export default selectedPlaylistSlice.reducer;
