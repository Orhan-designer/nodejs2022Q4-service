/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResModel } from './models/favorites.model';

@Controller('favs')
export class FavoritesController {
    constructor(private readonly _favoritesService: FavoritesService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): FavoritesResModel {
        return this._favoritesService.findAll();
    }

    @Post('/track/:id')
    @HttpCode(HttpStatus.CREATED)
    addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string) {
        return this._favoritesService.addTrack(_id);
    }

    @Post('/album/:id')
    @HttpCode(HttpStatus.CREATED)
    addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string) {
        return this._favoritesService.addAlbum(_id);
    }

    @Post('/artist/:id')
    @HttpCode(HttpStatus.CREATED)
    addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string) {
        return this._favoritesService.addArtist(_id);
    }

    @Delete('/track/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeTrack(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
    ): null {
        return this._favoritesService.removeTrack(_id, false);
    }

    @Delete('/album/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeAlbum(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
    ): null {
        return this._favoritesService.removeAlbum(_id, false);
    }

    @Delete('/artist/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeArtist(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
    ): null {
        return this._favoritesService.removeArtist(_id, false);
    }
}