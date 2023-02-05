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
    HttpException
} from '@nestjs/common';
import { ALBUM_NOT_FOUND } from '../helpers/constants/albums';
import { AlbumsService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumModel } from './models/album.model';

@Controller('album')
export class AlbumsController {
    constructor(private readonly _albumsService: AlbumsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body(ValidationPipe) _createAlbumDto: CreateAlbumDto): AlbumModel {
        return this._albumsService.create(_createAlbumDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): AlbumModel[] {
        return this._albumsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
    ): AlbumModel {
        const album = this._albumsService.findOne(_id);

        if (!album) throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND)
        return album;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
        @Body(ValidationPipe) _updateAlbumDto: UpdateAlbumDto,
    ): AlbumModel {
        return this._albumsService.update(_id, _updateAlbumDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string): null {
        return this._albumsService.remove(_id);
    }
}