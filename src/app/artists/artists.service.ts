/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistModel } from './models/artist.model';
import { InMemoryDB } from 'src/database/in-memory.db';
import { v4 as uuid_v4 } from 'uuid';
import { ARTIST_NOT_FOUND } from '../helpers/constants/artists';
import { AlbumsService } from '../albums/album.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistsService {
    constructor(
        private _db: InMemoryDB,
        @Inject(forwardRef(() => AlbumsService))
        private _albumService: AlbumsService,
        @Inject(forwardRef(() => TracksService))
        private _trackService: TracksService,
        @Inject(forwardRef(() => FavoritesService))
        private _favoritesService: FavoritesService
    ) { }

    create(_createArtistDto: CreateArtistDto): ArtistModel {
        const artist: ArtistModel = new Artist({
            id: uuid_v4(),
            name: _createArtistDto.name,
            grammy: _createArtistDto.grammy
        });

        this._db.artists.push(artist)
        return artist;
    }

    findAll(): ArtistModel[] {
        return this._db.artists;
    }

    findOne(_id: string): ArtistModel | null {
        const artist: ArtistModel | null = this._db.artists.find((_artist: ArtistModel) => _artist.id === _id);

        if (!artist) return null;
        return artist;
    }

    update(_id: string, _updateArtistDto: UpdateArtistDto): ArtistModel {
        const { grammy, name } = _updateArtistDto;
        const artist: ArtistModel | null = this._db.artists.find((_artist: ArtistModel) => _artist.id === _id);

        if (!artist) {
            throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            artist.grammy = grammy;
            artist.name = name;
            return artist;
        }
    }

    remove(_id: string): null {
        const artistIndex: number = this._db.artists.findIndex((_artist: ArtistModel) => _artist.id === _id);

        if (artistIndex < 0) {
            throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            this._albumService.clearArtists(_id);
            this._trackService.clearArtists(_id);
            this._favoritesService.removeArtist(_id, true);
            this._db.artists.splice(artistIndex, 1);
            return null;
        }
    }
}