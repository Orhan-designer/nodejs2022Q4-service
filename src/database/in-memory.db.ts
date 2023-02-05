/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/app/users/models/user.model';
import { ArtistModel } from 'src/app/artists/models/artist.model';
import { TrackModel } from 'src/app/tracks/models/track.model';
import { AlbumModel } from 'src/app/albums/models/album.model';
import { FavoritesModel } from 'src/app/favorites/models/favorites.model';

@Injectable()
export class InMemoryDB {
    public users: UserModel[] = [];
    public artists: ArtistModel[] = [];
    public tracks: TrackModel[] = [];
    public albums: AlbumModel[] = [];
    public favorites: FavoritesModel = {
        artists: [],
        albums: [],
        tracks: []
    }
}
