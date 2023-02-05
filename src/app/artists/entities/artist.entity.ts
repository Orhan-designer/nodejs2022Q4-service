/* eslint-disable prettier/prettier */
import { ArtistModel } from "../models/artist.model";

export class Artist {
    id: string;
    name: string;
    grammy: boolean;

    constructor(_artist: ArtistModel) {
        Object.assign(this, _artist)
    }
}
