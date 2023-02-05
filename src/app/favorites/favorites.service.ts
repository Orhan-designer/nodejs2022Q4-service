/* eslint-disable prettier/prettier */
import { forwardRef, HttpStatus, Inject, Injectable, HttpException } from '@nestjs/common';
import { ALBUM_NOT_FOUND } from '../helpers/constants/albums';
import { ARTIST_NOT_FOUND } from '../helpers/constants/artists';
import { ADDED_SUCCESSFULLY } from '../helpers/constants/favorites';
import { TRACK_NOT_FOUND } from '../helpers/constants/tracks';
import { InMemoryDB } from 'src/database/in-memory.db';
import { AlbumsService } from '../albums/album.service';
import { AlbumModel } from '../albums/models/album.model';
import { ArtistsService } from '../artists/artists.service';
import { ArtistModel } from '../artists/models/artist.model';
import { TrackModel } from '../tracks/models/track.model';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesResModel } from './models/favorites.model';

@Injectable()
export class FavoritesService {
    constructor(
        private _db: InMemoryDB,
        @Inject(forwardRef(() => ArtistsService))
        private _artistService: ArtistsService,
        @Inject(forwardRef(() => TracksService))
        private _trackService: TracksService,
        @Inject(forwardRef(() => AlbumsService))
        private _albumService: AlbumsService,
    ) { }

    findAll(): FavoritesResModel {
        const albums: AlbumModel[] = this._db.albums.filter((_el: AlbumModel) =>
            this._db.favorites.albums.includes(_el.id),
        );

        const artists: ArtistModel[] = this._db.artists.filter((_el: ArtistModel) =>
            this._db.favorites.artists.includes(_el.id),
        );

        const tracks: TrackModel[] = this._db.tracks.filter((_el: TrackModel) =>
            this._db.favorites.tracks.includes(_el.id),
        );

        return {
            albums,
            tracks,
            artists,
        };
    }

    addTrack(_id) {
        const track = this._trackService.findOne(_id);

        if (!track) {
            throw new HttpException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        };

        this._db.favorites.tracks.push(track.id);
        return { message: ADDED_SUCCESSFULLY };
    }

    addAlbum(_id) {
        const album = this._albumService.findOne(_id);

        if (!album) {
            throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        };

        this._db.favorites.albums.push(album.id);
        return { message: ADDED_SUCCESSFULLY };
    }

    addArtist(_id) {
        const artist = this._artistService.findOne(_id);

        if (!artist) {
            throw new HttpException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY)
        };

        this._db.favorites.artists.push(artist.id);
        return { message: ADDED_SUCCESSFULLY };
    }

    removeTrack(_id, _isDeleted): null {
        const trackIndex: number = this._db.favorites.tracks.findIndex(
            (_track: string) => _track === _id,
        );

        if (trackIndex < 0 && !_isDeleted) {
            throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else if (trackIndex >= 0) {
            this._db.favorites.tracks.splice(trackIndex, 1);
        }

        return null;
    }

    removeAlbum(_id, _isDeleted): null {
        const albumIndex: number = this._db.favorites.albums.findIndex(
            (_album: string) => _album === _id,
        );

        if (albumIndex < 0 && !_isDeleted) {
            throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else if (albumIndex >= 0) {
            this._db.favorites.albums.splice(albumIndex, 1);
        }

        return null;
    }

    removeArtist(_id, _isDeleted): null {
        const artistIndex: number = this._db.favorites.artists.findIndex(
            (_artist: string) => _artist === _id,
        );

        if (artistIndex < 0 && !_isDeleted) {
            throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else if (artistIndex >= 0) {
            this._db.favorites.artists.splice(artistIndex, 1);
        }

        return null;
    }
}