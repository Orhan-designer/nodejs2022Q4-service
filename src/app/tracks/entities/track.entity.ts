/* eslint-disable prettier/prettier */
import { TrackModel } from "../models/track.model";

export class Track {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;

    constructor(_track: TrackModel) {
        Object.assign(this, _track);
    }
}