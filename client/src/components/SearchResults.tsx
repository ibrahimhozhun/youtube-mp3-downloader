import React from "react";
import { useSong } from "../contexts/SongContext";


const SearchResults: React.FC = () => {
  const { songs, isinitState } = useSong();

  return (
    <>
      <div className="title">
        {/* If it's inital state we want title to be Recommended Songs 'cause songs in initial state are my favs */}
        <h1>{isinitState ? "Recommended Songs" : "Search Results"}</h1>
      </div>
      {songs.map(({ title, artist, videoID }: ISong) => (
        <div className="song-grid" key={videoID}>
          {/* Embed youtube video of song */}
          <iframe
            className="song-video"
            title={title}
            src={`https://www.youtube.com/embed/${videoID}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            frameBorder="0"
            loading="lazy"
          ></iframe>
          <div className="song-info">
            <h2 className="song-title">{title}</h2>
            <h4 className="song-artist">{artist}</h4>
            <a
              className="download-btn"
              href={`${process.env.REACT_APP_SERVER_URL}/download?url=${videoID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="download-btn"
              >
                Download
              </button>
            </a>
          </div>
        </div>
      ))}
    </>
  )
}

export default SearchResults;