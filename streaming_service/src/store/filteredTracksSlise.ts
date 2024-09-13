import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import { ITrack } from "../types";

interface FilteredTracksState {
    tracks: ITrack[] | null;
}

const initialState: FilteredTracksState = {
    tracks: null,
};

const filteredTracksSlice = createSlice({
    name: "filteredTracks",
    initialState,
    reducers: {
        setFilteredTracks: (state, action: PayloadAction<ITrack[]>) => {
            state.tracks = action.payload;
        },
        clearFilteredTracks: (state) => {
            state.tracks = null;
        },
    },
});

export const { setFilteredTracks, clearFilteredTracks } = filteredTracksSlice.actions;
export const selectFilteredTracks = (state: RootState) => state.filteredTracks.tracks;

export default filteredTracksSlice.reducer;