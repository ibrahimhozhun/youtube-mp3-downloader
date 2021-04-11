import { Request, Response } from "express";
import axios from 'axios';
import { IMetadata, extractTitleAndArtist } from "./";

/**
 * @param {string} str The String that you need the change
 * @param {Array} find Chars you wanna replace
 * @param {Array} replace chars you wanna change with
 * @returns Replaced string
 * @description This function replaces the given string with the given find and replace array
 */
const replaceStr = (str: string, find: string[], replace: string[]) => {
    for (var i = 0; i < find.length; i++) {
        str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
    }
    return str;
}

export default async (req: Request, res: Response) => {
    const { query } = req.params;

    const youtubeApi = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: {
            part: "snippet",
            maxResults: 5,
            key: process.env.API_KEY
        },
        headers: {}
    });

    try {
        const response = await youtubeApi.get('/search', {
            params: {
                q: query
            }
        });

        const searchResults = response.data.items.filter((item: { id: { kind: string; }; }) => {
            return item.id.kind.includes('video');
        });

        let songs: IMetadata[] = [];

        searchResults.forEach(({ snippet, id }: { snippet: { title: string; channelTitle: string; }, id: { videoId: string; } }) => {
            // Song title
            let title: string;
            const find = ['&amp;', '&#39;'];
            const replace = ['&', "'"];
            title = replaceStr(snippet.title, find, replace);

            const channelTitle: string = snippet.channelTitle;

            // Title and artist
            const _song = extractTitleAndArtist(title);

            const song: IMetadata = {
                title: _song.title,
                // If we don't have a artist name on video title we get channel name as the artist
                // but youtube has 'Topics' and we don't wanna write it to metadata
                // so we're cutting it if it's there
                artist: _song.artist ?
                    _song.artist : channelTitle.includes("- Topic") ?
                        channelTitle.slice(0, channelTitle.indexOf("-")) : channelTitle,
                album: title,
                videoID: id.videoId
            };
            songs.push(song);
        });

        res.json(songs);
    } catch (error) {
        res.json({ error });
    }
}