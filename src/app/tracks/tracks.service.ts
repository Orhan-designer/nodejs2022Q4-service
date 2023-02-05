/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackModel } from './models/track.model';
import { v4 as uuid_v4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { TRACK_NOT_FOUND } from '../helpers/constants/tracks';

@Injectable()
export class TracksService {
    constructor(
        private _db: InMemoryDB,
        @Inject(forwardRef(() => FavoritesService))
        private _favoriteService: FavoritesService
    ) { }

    create(_createTrackDto: CreateTrackDto): TrackModel {
        const track: TrackModel = new Track({
            id: uuid_v4(),
            name: _createTrackDto.name,
            albumId: _createTrackDto.albumId,
            artistId: _createTrackDto.artistId,
            duration: _createTrackDto.duration,
        });

        this._db.tracks.push(track);
        return track;
    }

    findAll(): TrackModel[] {
        return this._db.tracks;
    }

    findOne(_id: string): TrackModel | null {
        const track: TrackModel | null = this._db.tracks.find(
            (_track: TrackModel) => _track.id === _id
        );

        if (!track) return null;
        return track;
    }

    update(_id: string, _updateTrackDto: UpdateTrackDto): TrackModel {
        const track: TrackModel | null = this._db.tracks.find(
            (_track: TrackModel) => _track.id === _id
        );

        if (!track) {
            throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            track.albumId = _updateTrackDto.albumId;
            track.artistId = _updateTrackDto.artistId;
            track.duration = _updateTrackDto.duration;
            track.name = _updateTrackDto.name;
            return track;
        }
    }

    remove(_id: string): null {
        const trackIndex: number = this._db.tracks.findIndex(
            (_track: TrackModel) => _track.id === _id
        );

        if (trackIndex < 0) {
            throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            this._favoriteService.removeTrack(_id, true);
            this._db.tracks.splice(trackIndex, 1);
            return null;
        }
    }

    clearAlbums(_id: string): void {
        const tracks = this._db.tracks.map((_el: TrackModel) => {
            if (_el.albumId === _id) {
                return {
                    ..._el,
                    albumId: null
                };
            } else {
                return _el;
            }
        });

        this._db.tracks = tracks;
    }

    clearArtists(_id: string): void {
        const tracks = this._db.tracks.map((_el: TrackModel) => {
            if (_el.artistId === _id) {
                return {
                    ..._el,
                    artistId: null,
                };
            } else {
                return _el;
            }
        });
        
        this._db.tracks = tracks;
    }
}