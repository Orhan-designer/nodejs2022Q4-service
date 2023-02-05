/* eslint-disable prettier/prettier */
import { AlbumModel } from 'src/app/albums/models/album.model';
import { ArtistModel } from 'src/app/artists/models/artist.model';
import { TrackModel } from 'src/app/tracks/models/track.model';

export interface FavoritesModel {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}

export interface FavoritesResModel {
    artists: ArtistModel[]; // favorite artists ids
    albums: AlbumModel[]; // favorite albums ids
    tracks: TrackModel[]; // favorite tracks ids
}