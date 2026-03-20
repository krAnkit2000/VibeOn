import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function MusicPlayer({
  songs,
  currentIndex,
  setCurrentIndex,
  isPlaying,
  setIsPlaying
}) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play().catch(() => {}) : audio.pause();
  }, [isPlaying, currentIndex]);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration)) return;

    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    if (audioRef.current.duration) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  return (
    <div
      style={{
        width: "320px",
        padding: "25px",
        borderRadius: "30px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(25px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        textAlign: "center",
        transition: "0.3s"
      }}
    >
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* 🎵 Thumbnail with glow */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "200px",
          height: "200px"
        }}
      >
        <img
          src={currentSong.image || "https://via.placeholder.com/200"}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            objectFit: "cover",
            boxShadow: isPlaying
              ? "0 0 25px rgba(29,185,84,0.7)"
              : "0 5px 20px rgba(0,0,0,0.5)",
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
            transition: "0.4s"
          }}
        />
      </div>

      <h2 style={{ marginTop: "15px" }}>{currentSong.title}</h2>
      <p style={{ color: "#aaa" }}>{currentSong.artist}</p>

      {/* ⏱️ Time */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          marginTop: "10px"
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* 🎯 Progress Bar */}
      <div
        ref={progressRef}
        onClick={handleSeek}
        style={{
          height: "6px",
          background: "#444",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "5px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "6px",
            background: "linear-gradient(to right,#1db954,#1ed760)",
            transition: "0.2s"
          }}
        />
      </div>

      {/* 🎮 Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "25px"
        }}
      >
        <button style={btn} onClick={prevSong}>
          <SkipBack />
        </button>

        <button
          style={{
            ...btn,
            background: "#1db954",
            transform: "scale(1.2)"
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <button style={btn} onClick={nextSong}>
          <SkipForward />
        </button>
      </div>
    </div>
  );
}

const btn = {
  padding: "12px",
  borderRadius: "50%",
  border: "none",
  background: "#333",
  color: "white",
  cursor: "pointer",
  transition: "0.2s"
};