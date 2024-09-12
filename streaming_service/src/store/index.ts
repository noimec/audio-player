import { configureStore } from "@reduxjs/toolkit";

import tracksReducer from "./tracksSlice";
import playlistsReducer from "./playlistsSlice";
import playerTrackReducer from "./playerTrackSlice";
import screenReducer from "./screenSlice";
import selectedPlaylistReducer from "./selectedPlaylistSlice";

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    playlists: playlistsReducer,
    playerTrack: playerTrackReducer,
    screen: screenReducer,
    selectedPlaylist: selectedPlaylistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

