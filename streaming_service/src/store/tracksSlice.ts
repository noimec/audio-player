import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ITrack, TracksState } from "../types";
import { RootState } from "../store";
import { getAuthHeaders } from "../utils";

export const fetchTracks = createAsyncThunk(
  "tracks/fetchTracks",
  async () => {
    try {
      const response = await axios.get<ITrack[]>('http://localhost:3000/api/songs', getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return undefined
    }
  }
);

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: null,
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<ITrack[] | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.tracks = action.payload;
        }
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.loading;
export const selectTracksError = (state: RootState) => state.tracks.error;

export default tracksSlice.reducer;