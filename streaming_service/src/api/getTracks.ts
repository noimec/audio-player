import axios from "axios";

import type { ITrack } from "../types";

export const getTracks = async (token: string): Promise<ITrack[] | undefined> => {
    try {
      const response = await axios.get('http://localhost:3000/api/songs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };