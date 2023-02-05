/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ValidationPipe,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
    Put,
    HttpException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackModel } from './models/track.model';
import { TRACK_NOT_FOUND } from '../helpers/constants/tracks';

@Controller('track')
export class TracksController {
    constructor(private readonly _tracksService: TracksService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body(ValidationPipe) _createTrackDto: CreateTrackDto) {
        return this._tracksService.create(_createTrackDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): TrackModel[] {
        return this._tracksService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
    ): TrackModel {
        const track = this._tracksService.findOne(_id);

        if (!track) throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND)
        return track;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
        @Body(ValidationPipe) _updateTrackDto: UpdateTrackDto,
    ): TrackModel {
        return this._tracksService.update(_id, _updateTrackDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string): null {
        return this._tracksService.remove(_id);
    }
}