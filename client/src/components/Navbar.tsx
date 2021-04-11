import React, { useRef, useState } from "react";
import { useSong } from "../contexts/SongContext";

const Navbar: React.FC = () => {
  const [query, setQuery] = useState("");
  const { updateSongs } = useSong();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const download = (url: string) => {
    // Check if href attribute exists 'cause it may not
    if (downloadRef.current?.href) {
      // 
      downloadRef.current.href = url;
      downloadRef.current.click();
    } else {
      console.log("href attribute does not exist");
    }
    // Reset query string
    setQuery("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get user typed a url or a video id or just a search query
    const option: string = query.includes("video-url: ") ?
      "url" : query.includes("video-id: ") ?
        "id" : "search";

    switch (option) {
      case "url":
        return download(`${process.env.REACT_APP_SERVER_URL}/download?url=${query.slice(11)}`);

      case "id":
        return download(`${process.env.REACT_APP_SERVER_URL}/download?url=${query.slice(10)}`);

      case "search":
        return updateSongs(query.slice(8));

      default:
        updateSongs(query);
    }
  }

  return (
    <header className="navbar">
      {/* We will use this anchor tag to download song directly from input field */}
      <a
        href="#download"
        ref={downloadRef}
        style={{ display: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      > </a>
      <form
        className="navbar-grid"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          placeholder="Search for a song"
          aria-label="Search for a song"
          onChange={e => setQuery(e.target.value)}
          className="input-field"
          name="query"
          list="options"
          value={query}
          type="text"
          required
        />
        <datalist id="options">
          <option value="video-url: ">Download song directly by youtube video url</option>
          <option value="video-id: ">Download song directly by youtube video id</option>
          <option value="search: ">Or you can just type a song name to search it on youtube</option>
        </datalist>
        <div className="btn-div">
          <button className="submit-btn" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </header>
  )
}

export default Navbar;
