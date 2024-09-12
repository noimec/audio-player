import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTracks } from "../store/tracksSlice";
import { RootState } from "../store";
import { setSelectedTrack } from "../store/playerTrackSlice";
import { selectScren } from "../store/screenSlice";
import { selectPlaylists } from "../store/playlistsSlice";

export const useAudio = (audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    const tracks = useSelector(selectTracks);
    const track = useSelector(
        (state: RootState) => state.playerTrack.selectedTrack
    );
    const screen = useSelector(selectScren);
    const playlists = useSelector(selectPlaylists)
    const dispatch = useDispatch();

    const [loop, setLoop] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [lastVolume, setLastVolume] = useState(volume);

    useEffect(() => {
        if (track && audioRef.current) {
            setCurrentTime(0);
            if (audioRef.current) {
                audioRef.current.src = `http://localhost:3000${track.path}`;
                if (isPlaying) {
                    audioRef.current.play();
                }
            }
        }
    }, [track]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const changeAudioToPlayhead = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current && e.target) {
            audioRef.current.currentTime = parseFloat(e.target.value);
            setCurrentTime(parseFloat(e.target.value));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volumeValue = parseFloat(e.target.value);
        setVolume(volumeValue);
        setIsMuted(false)
        if (audioRef.current) {
            audioRef.current.volume = volumeValue;
        }
    };

    const skipToNextTrack = () => {
        if (track) {
            if (tracks.length === track.id) {
                dispatch(setSelectedTrack(tracks[0]));
            } else {
                dispatch(setSelectedTrack(tracks[track.id]));
            }
        }
    };

    const skipToPreviousTrack = () => {
        if (track) {
            if (track.id === 1) {
                dispatch(setSelectedTrack(tracks[tracks.length - 1]));
            } else {
                dispatch(setSelectedTrack(tracks[track.id - 2]));
            }
        }
    };

    const toggleLoop = () => {
        setLoop(!loop);
        if (audioRef.current) {
            audioRef.current.loop = !loop;
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                setIsMuted(false);
                audioRef.current.volume = lastVolume;
            } else {
                setLastVolume(volume);
                setIsMuted(true);
                audioRef.current.volume = 0;
            }
        }
    };

    return {
        currentTime,
        volume,
        handleVolumeChange,
        handleTimeUpdate,
        changeAudioToPlayhead,
        toggleLoop,
        skipToNextTrack,
        togglePlayPause,
        skipToPreviousTrack,
        track,
        isPlaying,
        loop,
        isMuted,
        toggleMute
    }
}