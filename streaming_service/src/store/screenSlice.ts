import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SwitchScreenType } from "../types";
import { RootState } from ".";

interface ScreenSliceState {
    screen: SwitchScreenType;
}

const initialState: ScreenSliceState = {
    screen: 'tracks',
};

const screenSlice = createSlice({
    name: "screen",
    initialState,
    reducers: {
        setScreen: (state, action: PayloadAction<SwitchScreenType>) => {
            state.screen = action.payload;
        },
        clearScreen: (state) => {
            state.screen = 'tracks';
        },
    },
});

export const { setScreen, clearScreen } = screenSlice.actions;
export const selectScren = (state: RootState) => state.screen.screen;

export default screenSlice.reducer;