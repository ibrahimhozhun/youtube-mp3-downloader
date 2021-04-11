export { default as searchVideo } from "./search";
export { default as downloadAudio } from "./download";

/**
 * @param {string} string This parameter must include title and artist
 * @returns The title and the artist if finds them else returns given string
 * @description This function extracts title and artist from the given parameter 
 */
export const extractTitleAndArtist = (string: string) => {
  const braceIndex = string.indexOf("-");
  if (braceIndex > 0) {
    return {
      title: string.slice(braceIndex + 1).trim(),
      artist: string.slice(0, braceIndex).trim()
    };
  } else {
    return {
      title: string
    }
  }
}

// Metadata interface
export interface IMetadata {
  artist: string,
  album: string,
  title: string,
  APIC?: string,
  videoID?: string,
}