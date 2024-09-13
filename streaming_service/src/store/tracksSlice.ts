import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getAuthHeaders } from '../utils';
import type { ITrack } from '../types/components';
import type { TracksState } from './types';

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async () => {
  try {
    const response = await axios.get<ITrack[]>(
      'http://localhost:3000/api/songs',
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return undefined;
  }
});

export const setLikeTrack = createAsyncThunk(
  'tracks/setLikeTrack',
  async ({ trackId }: { trackId: number }) => {
    try {
      const response = await axios.post<ITrack>(
        `http://localhost:3000/api/songs/${trackId}/like`,
        {},
        getAuthHeaders(),
      );
      return response.data;
    } catch (error) {
      console.error('Error like track:', error);
      return undefined;
    }
  },
);

export const setUnlikeTrack = createAsyncThunk(
  'tracks/setUnlikeTrack',
  async ({ trackId }: { trackId: number }) => {
    try {
      const response = await axios.post<ITrack>(
        `http://localhost:3000/api/songs/${trackId}/unlike`,
        {},
        getAuthHeaders(),
      );
      return response.data;
    } catch (error) {
      console.error('Error unlike track:', error);
      return undefined;
    }
  },
);

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: null,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTracks.fulfilled,
        (state, action: PayloadAction<ITrack[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.tracks = action.payload;
          }
        },
      )
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setLikeTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setLikeTrack.fulfilled,
        (state, action: PayloadAction<ITrack | undefined>) => {
          state.loading = false;
          if (action.payload) {
            const index = state.tracks.findIndex(
              (track) => track.id === action.payload?.id,
            );
            if (index !== -1) {
              state.tracks[index].likes = action.payload.likes;
            }
          }
        },
      )
      .addCase(setLikeTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setUnlikeTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setUnlikeTrack.fulfilled,
        (state, action: PayloadAction<ITrack | undefined>) => {
          state.loading = false;
          if (action.payload) {
            const index = state.tracks.findIndex(
              (track) => track.id === action.payload?.id,
            );
            if (index !== -1) {
              state.tracks[index].likes = action.payload.likes;
            }
          }
        },
      )
      .addCase(setUnlikeTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.loading;
export const selectTracksError = (state: RootState) => state.tracks.error;

export default tracksSlice.reducer;
