import React, { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer";
import Playlist from "./Playlist";

const songs = [
  {
    id: 1,
    title: "Dreams",
    artist: "Artist 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "https://picsum.photos/200?1"
  },
  {
    id: 2,
    title: "Waves",
    artist: "Artist 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: "https://picsum.photos/200?2"
  },
  {
    id: 3,
    title: "Skyline",
    artist: "Artist 3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    image: "https://picsum.photos/200?3"
  },
  {
    id: 4,
    title: "Track 4",
    artist: "Artist 4",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    image: "https://picsum.photos/200?4"
  },
  {
    id: 5,
    title: "Track 5",
    artist: "Artist 5",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    image: "https://picsum.photos/200?5"
  },
  {
    id: 6,
    title: "Track 6",
    artist: "Artist 6",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    image: "https://picsum.photos/200?6"
  },
  {
    id: 7,
    title: "Track 7",
    artist: "Artist 7",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    image: "https://picsum.photos/200?7"
  }
];

export default function MusicUi() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ display: "flex", gap: "30px" }}>
        
        <MusicPlayer
          songs={songs}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />

        <Playlist
          songs={songs}
          likedSongs={likedSongs}
          setLikedSongs={setLikedSongs}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsPlaying={setIsPlaying}
        />

      </div>
    </div>
  );
}