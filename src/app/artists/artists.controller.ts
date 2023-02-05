/* eslint-disable prettier/prettier */
import {
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Controller,
    HttpCode,
    ValidationPipe,
    ParseUUIDPipe,
    HttpStatus,
    HttpException
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistModel } from './models/artist.model';
import { ARTIST_NOT_FOUND } from '../helpers/constants/artists';

@Controller('artist')
export class ArtistsController {
    constructor(private readonly _artistsService: ArtistsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body(ValidationPipe) _createArtistDto: CreateArtistDto): ArtistModel {
        return this._artistsService.create(_createArtistDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): ArtistModel[] {
        return this._artistsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string) {
        const artist = this._artistsService.findOne(_id);

        if (!artist) throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        return artist;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
        @Body(ValidationPipe) _updateArtistDto: UpdateArtistDto) {
        return this._artistsService.update(_id, _updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string) {
        return this._artistsService.remove(_id);
    }
}
