import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { PlayerTrackState } from "./types";
import type { ITrack } from "../types/components";

const initialState: PlayerTrackState = {
    selectedTrack: null,
};

const playerTrackSlice = createSlice({
    name: "playerTrack",
    initialState,
    reducers: {
        setSelectedTrack: (state, action: PayloadAction<ITrack>) => {
            state.selectedTrack = action.payload;
        },
        clearSelectedTrack: (state) => {
            state.selectedTrack = null;
        },
    },
});

export const { setSelectedTrack, clearSelectedTrack } = playerTrackSlice.actions;

export default playerTrackSlice.reducer;