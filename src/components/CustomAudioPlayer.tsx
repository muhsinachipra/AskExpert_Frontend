import { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface CustomAudioPlayerProps {
    audioSrc: string;
}

const CustomAudioPlayer = ({ audioSrc }: CustomAudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        if (!isFinite(time)) return "";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = parseFloat(event.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    return (
        <div className="custom-audio-player flex flex-col items-center bg-gray-200 p-4 rounded-lg shadow-lg max-w-lg mx-auto sm:max-w-md sm:p-3">
            <div className="flex items-center w-full flex-wrap sm:flex-nowrap">
                <button onClick={togglePlay} className="mr-4 text-2xl text-blue-500 hover:text-blue-700 sm:mr-2">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="flex-grow h-1 bg-blue-500 rounded-full appearance-none cursor-pointer sm:mr-2"
                    aria-label="Seek to"
                />
                <span className="ml-4 text-sm text-gray-600 sm:ml-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>

            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
            />
        </div>
    );
};

export default CustomAudioPlayer;
