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
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
    constructor(private readonly _usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body(ValidationPipe) _createUserDto: CreateUserDto): UserModel {
        return this._usersService.create(_createUserDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): UserModel[] {
        return this._usersService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string): UserModel {
        return this._usersService.findOne(_id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) _id: string,
        @Body(ValidationPipe) _updateUserDto: UpdateUserDto): UserModel {
        return this._usersService.update(_id, _updateUserDto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) _id: string): null {
        return this._usersService.remove(_id);
    }
}
