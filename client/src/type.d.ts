interface ISong {
  title: string,
  artist: string,
  videoID: string,
}

type SongContextType = {
  songs: ISong[];
  isinitState: boolean;
  updateSongs: (query: string) => void;
}
