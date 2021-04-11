import { createContext, useContext, useState } from 'react';
import axios from "axios";

const defaultValue: SongContextType = {
  songs: [],
  isinitState: true,
  updateSongs: () => console.warn('no song provider')
}

const SongContext = createContext<SongContextType>(defaultValue);
export const useSong = () => useContext(SongContext);

export const SongProvider: React.FC = ({ children }) => {
  // We declared a 'isinitState' variable because we want to show something different 
  // if it's initialize state and something different if it's loading 
  // we know the which situation we are in using this variable
  const [state, setState] = useState<{ songs: ISong[], isinitState: boolean }>({
    songs: [
      {
        title: "Secrets",
        artist: "OneRepublic",
        videoID: "UTRF-w-0HdA"
      },
      {
        title: "Believer",
        artist: "Imagine Dragons",
        videoID: "IhP3J0j9JmY"
      },
      {
        title: "Kediler ve Şarkılar",
        artist: "Yaşlı Amca",
        videoID: "wRXn2zWneG8"
      },
      {
        title: "Boşver Sen",
        artist: "Kendimden Hallice",
        videoID: "T05jHLT51gI"
      },
    ],
    isinitState: true
  });

  const updateSongs = async (query: string) => {
    // Reset songs list
    setState({ songs: [], isinitState: false });

    // Get data from server
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search/${query}`);

    // Update songs list with data from server
    data.forEach((song: ISong) =>
      setState(({ songs }) => ({
        songs: [...songs, song],
        isinitState: false
      })));
  };

  return (
    <SongContext.Provider value={{ ...state, updateSongs }}>
      {children}
    </SongContext.Provider>
  )
}