import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import { IPlaylist, PlaylistsState } from "../types";

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get<IPlaylist[]>('http://localhost:3000/api/users/playlists', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching playlists:", error);
      return thunkAPI.rejectWithValue("Failed to load playlists");
    }
  }
);

export const addPlaylist = createAsyncThunk(
  "playlists/addPlaylist",
  async ({ name, token }: { name: string; token: string }, thunkAPI) => {
    try {
      const response = await axios.post<IPlaylist>(
        'http://localhost:3000/api/playlists',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding playlist:", error);
      return thunkAPI.rejectWithValue("Failed to add playlist");
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
      .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<IPlaylist[]>) => {
        state.loading = false;
        state.playlists = action.payload;
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
      });
  },
});

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
export const selectPlaylistsLoading = (state: RootState) => state.playlists.loading;
export const selectPlaylistsError = (state: RootState) => state.playlists.error;

export default playlistsSlice.reducer;