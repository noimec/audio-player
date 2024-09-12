import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPlaylist } from "../types";
import { RootState } from ".";

interface SelectedPlaylistState {
    selectedPlaylist: IPlaylist | null;
}

const initialState: SelectedPlaylistState = {
    selectedPlaylist: null,
};

const selectedPlaylistSlice = createSlice({
    name: "selectedPlaylist",
    initialState,
    reducers: {
        setSelectedPlaylist: (state, action: PayloadAction<IPlaylist | null>) => {
            state.selectedPlaylist = action.payload;
        },
        clearSelectedPlaylist: (state) => {
            state.selectedPlaylist = null;
        },
    },
});

export const { setSelectedPlaylist, clearSelectedPlaylist } = selectedPlaylistSlice.actions;
export const selectSelectedPlaylist = (state: RootState) => state.selectedPlaylist.selectedPlaylist;

export default selectedPlaylistSlice.reducer;