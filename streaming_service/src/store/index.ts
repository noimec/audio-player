import { configureStore } from "@reduxjs/toolkit";

import tracksReducer from "./tracksSlice";
import playlistsReducer from "./playlistsSlice";

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    playlists: playlistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

