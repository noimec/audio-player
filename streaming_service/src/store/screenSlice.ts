import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import type { ScreenSliceState } from './types';
import type { SwitchScreenType } from '../types/components';

const initialState: ScreenSliceState = {
  screen: 'tracks',
};

const screenSlice = createSlice({
  name: 'screen',
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
