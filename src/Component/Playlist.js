import React, { useState } from "react";

export default function Playlist({
  songs,
  likedSongs,
  setLikedSongs,
  currentIndex,
  setCurrentIndex,
  setIsPlaying
}) {
  const [search, setSearch] = useState("");
  const [showLiked, setShowLiked] = useState(false);

  const toggleLike = (song) => {
    const exists = likedSongs.find((s) => s.id === song.id);
    exists
      ? setLikedSongs(likedSongs.filter((s) => s.id !== song.id))
      : setLikedSongs([...likedSongs, song]);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  const list = showLiked ? likedSongs : filteredSongs;

  return (
    <div style={{
      width: "300px",
      height: "500px",
      borderRadius: "25px",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      
      {/* Header */}
      <div style={{
        padding: "20px",
        position: "sticky",
        top: 0,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 onClick={() => setShowLiked(false)} style={{ cursor: "pointer" }}>Playlist</h3>
          <h3 onClick={() => setShowLiked(true)} style={{ cursor: "pointer" }}>❤️</h3>
        </div>

        {!showLiked && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "10px",
              border: "none",
              marginTop: "10px"
            }}
          />
        )}
      </div>

      {/* Scroll */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "10px 20px"
      }}>
        {list.map((song) => {
          const index = songs.findIndex((s) => s.id === song.id);
          const isLiked = likedSongs.some((s) => s.id === song.id);

          return (
            <div
              key={song.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "12px",
                background: index === currentIndex ? "#1db95433" : "transparent",
                cursor: "pointer",
                transition: "0.3s"
              }}
              className="song-item"
            >
              {/* 🎵 Image */}
              <img
                src={song.image}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  objectFit: "cover"
                }}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(true);
                }}
              />

              {/* 🎶 Info */}
              <div
                style={{ flex: 1 }}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(true);
                }}
              >
                <div>{song.title}</div>
                <small style={{ color: "#aaa" }}>{song.artist}</small>
              </div>

              {/* ❤️ */}
              <span onClick={() => toggleLike(song)}>
                {isLiked ? "❤️" : "🤍"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}