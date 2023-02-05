/* eslint-disable prettier/prettier */
import { forwardRef, HttpStatus, Inject, Injectable, HttpException } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumModel } from './models/album.model';
import { v4 as uuid_v4 } from 'uuid';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ALBUM_NOT_FOUND } from '../helpers/constants/albums';

@Injectable()
export class AlbumsService {
    constructor(
        private _db: InMemoryDB,
        @Inject(forwardRef(() => TracksService))
        private _trackService: TracksService,
        @Inject(forwardRef(() => FavoritesService))
        private _favoriteService: FavoritesService
    ) { }

    create(_createAlbumDto: CreateAlbumDto): AlbumModel {
        const album: AlbumModel = new Album({
            id: uuid_v4(),
            artistId: _createAlbumDto.artistId,
            name: _createAlbumDto.name,
            year: _createAlbumDto.year
        });

        this._db.albums.push(album);
        return album;
    }

    findAll(): AlbumModel[] {
        return this._db.albums;
    }

    findOne(_id: string): AlbumModel | null {
        const album: AlbumModel | null = this._db.albums.find(
            (_album: AlbumModel) => _album.id === _id
        );

        if (!album) return null;
        return album;
    }

    update(_id: string, _updateAlbumDto: UpdateAlbumDto): AlbumModel {
        const { name, year, artistId } = _updateAlbumDto;
        const album: AlbumModel | null = this._db.albums.find(
            (_album: AlbumModel) => _album.id === _id,
        );

        if (!album) {
            throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            album.name = name;
            album.year = year;
            album.artistId = artistId;
            return album;
        }
    }

    remove(_id: string): null {
        const albumIndex: number = this._db.albums.findIndex(
            (_album: AlbumModel) => _album.id === _id,
        );

        if (albumIndex < 0) {
            throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            this._trackService.clearAlbums(_id);
            this._favoriteService.removeAlbum(_id, true);
            this._db.albums.splice(albumIndex, 1);
            return null;
        }
    }

    clearArtists(_id: string): void {
        const albums = this._db.albums.map((_el: AlbumModel) => {
            if (_el.artistId === _id) {
                return {
                    ..._el,
                    artistId: null,
                };
            } else {
                return _el;
            }
        });
        
        this._db.albums = albums;
    }
}