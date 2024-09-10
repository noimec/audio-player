import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import { IPlaylist, PlaylistsState } from "../types";
import { getAuthHeaders } from "../utils";

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async () => {
    try {
      const response = await axios.get<IPlaylist[]>('http://localhost:3000/api/users/playlists', getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching playlists:", error);
      return undefined;
    }
  }
);

export const addPlaylist = createAsyncThunk(
  "playlists/addPlaylist",
  async ({ name }: { name: string }, thunkAPI) => {
    try {
      const response = await axios.post<IPlaylist>(
        'http://localhost:3000/api/playlists',
        { name },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error adding playlist:", error);
      return thunkAPI.rejectWithValue("Failed to add playlist");
    }
  }
);

export const removePlaylist = createAsyncThunk(
  "playlists/removePlaylist",
  async ({ playlistId }: { playlistId: number }, thunkAPI) => {
    try {
      await axios.delete<IPlaylist>(
        `http://localhost:3000/api/playlists/${playlistId}`,
        getAuthHeaders()
      );
      return playlistId;
    } catch (error) {
      console.error("Error remove playlist:", error);
      return thunkAPI.rejectWithValue("Failed to remove playlist");
    }
  }
);

export const addTrackToPlaylist = createAsyncThunk(
  "playlists/addTrackToPlaylist",
  async ({ playlistId, trackId }: { playlistId: number | null; trackId: number | null; }, thunkAPI) => {
    try {
      const response = await axios.post<IPlaylist>(
        `http://localhost:3000/api/playlists/${playlistId}/add/${trackId}`, {},
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error adding track to playlist:", error);
      return thunkAPI.rejectWithValue("Failed adding track to playlist");
    }
  }
);

const initialState: PlaylistsState = {
  playlists: [],
  loading: false,
  error: null,
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<IPlaylist[] | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.playlists = action.payload;
        }
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlaylist.fulfilled, (state, action: PayloadAction<IPlaylist>) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePlaylist.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.playlists = state.playlists.filter(playlist => playlist.id !== action.payload);
      })
      .addCase(removePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTrackToPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrackToPlaylist.fulfilled, (state, action: PayloadAction<IPlaylist>) => {
        state.loading = false;
        const updatedPlaylist = action.payload;
        state.playlists = state.playlists.map(playlist =>
          playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
        );
      })
      .addCase(addTrackToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
export const selectPlaylistsLoading = (state: RootState) => state.playlists.loading;
export const selectPlaylistsError = (state: RootState) => state.playlists.error;

export default playlistsSlice.reducer;