import React from "react";
import { useSong } from "../contexts/SongContext";
import SearchResults from "./SearchResults";
// This import is required for loading animation
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const HomePage: React.FC = () => {
  const { songs } = useSong();

  return (
    <div className="main">
      {songs.length > 0 ? (
        <SearchResults />
      ) : (
        <>
          <div className="loader">
            <h3>Wait for plane to bring search results :)</h3>
            <Loader
              type="Plane"
              color="#32817d"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage;
