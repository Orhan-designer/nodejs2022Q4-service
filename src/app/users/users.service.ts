/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { v4 as uuid_v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './models/user.model';
import { User } from './entities/user.entity';
import { USER_NOT_FOUND, INCORRECT_PASSWORD } from '../helpers/constants/users';

@Injectable()
export class UsersService {
    constructor(private _db: InMemoryDB) { }

    create(_createUserDto: CreateUserDto): UserModel {
        const date: number = Date.now();
        const newUser: UserModel = new User({
            id: uuid_v4(),
            login: _createUserDto.login,
            password: _createUserDto.password,
            version: 1,
            createdAt: date,
            updatedAt: date
        });
        this._db.users.push(newUser);
        return newUser;
    }

    findAll(): UserModel[] {
        return this._db.users;
    }

    findOne(_id: string): UserModel {
        const user: UserModel | null = this._db.users.find((_user: UserModel) => _user.id === _id);

        if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        return user;
    }

    update(_id: string, _updateUserDto: UpdateUserDto): UserModel {
        const { oldPassword, newPassword } = _updateUserDto;
        const user: UserModel | null = this._db.users.find((_user: UserModel) => _user.id === _id);

        if (!user) {
            throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else if (user.password !== oldPassword) {
            throw new HttpException(INCORRECT_PASSWORD, HttpStatus.FORBIDDEN);
        } else {
            user.version += 1;
            user.updatedAt = Date.now();
            user.password = newPassword;
            return user;
        }
    }

    remove(_id: string): null {
        const userIndex: number = this._db.users.findIndex((_user: UserModel) => _user.id === _id);

        if (userIndex < 0) {
            throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            this._db.users.splice(userIndex, 1);
            return null;
        }
    }
}