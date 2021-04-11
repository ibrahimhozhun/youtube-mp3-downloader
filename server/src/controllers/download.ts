import { Request, Response } from "express";
import ffmpeg from 'fluent-ffmpeg';
import NodeID3 from "node-id3";
import ytdl from "ytdl-core";
import axios from 'axios';
import fs from "fs";
import { IMetadata, extractTitleAndArtist } from "./";

/**
 * @param {string} url URL of cover image
 * @param {string} filePath Place to save image
 * @description Downloads image at url parameter and saves it
 */
const downloadCover = async (url: string, filePath: string) => {
  try {
    // Make download request
    const { data } = await axios({
      method: "GET",
      url,
      responseType: "stream"
    });

    // Download cover image
    await data.pipe(fs.createWriteStream(filePath));
    console.log("Cover successfully downloaded");
  } catch (err) {
    throw new Error(err);
  }
}

export default async (req: Request, res: Response) => {
  const url: any = req.query.url;

  // Get video details
  const { videoDetails } = await ytdl.getInfo(url);
  const title = videoDetails.title;
  const channelName = videoDetails.ownerChannelName;

  try {
    // Download audio
    const audio = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio'
    });

    downloadCover(`https://i.ytimg.com/vi/${videoDetails.videoId}/maxresdefault.jpg`, `${__dirname}/${title}.jpg`);

    // Convert audio to mp3 format
    ffmpeg(audio)
      .audioCodec('libmp3lame')
      .audioBitrate(128)
      .save(`${__dirname}/${title}.mp3`)
      .on("end", () => {
        // Metadata to write
        let metadata: IMetadata;

        // Title and author variables to write metadata
        const song = extractTitleAndArtist(title);

        metadata = {
          title: song.title,
          // If we don't have a artist name on video title we get channel name as the artist
          // but youtube has 'Topics' and we don't wanna write it to metadata
          // so we're cutting it if it's there
          artist: song.artist ?
            song.artist : channelName.includes("- Topic") ?
              channelName.slice(0, channelName.indexOf("-")) : channelName,
          album: title,
          APIC: `${__dirname}/${title}.jpg`
        }

        try {
          // Write metadata to song
          const result: boolean | Error = NodeID3.write(metadata, `${__dirname}/${title}.mp3`);

          // Send song file to client
          res.download(`${__dirname}/${title}.mp3`, (err) => {
            if (err) console.log(err);
            // Delete song and cover from server
            fs.unlink(`${__dirname}/${title}.mp3`, (err) => {
              // Check if there's any errors
              if (err) return console.log("Failed to delete song, error: ", err);
              else fs.unlink(`${__dirname}/${title}.jpg`, (err) => {
                if (err) return console.log("Failed to delete cover, error: ", err);
                else console.log("Song and cover successfully deleted!");
              });
            });
          });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error });
        }
      });
  } catch (err) {
    console.error(err);
    res.end();
  }
}
