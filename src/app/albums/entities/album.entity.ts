/* eslint-disable prettier/prettier */
import { AlbumModel } from '../models/album.model';

export class Album {
    id: string;
    name: string;
    year: number;
    artistId: string | null;

    constructor(_album: AlbumModel) {
        Object.assign(this, _album);
    }
}