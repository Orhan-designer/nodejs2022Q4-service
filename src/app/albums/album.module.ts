/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './album.service';
import { AlbumsController } from './album.controller';
import { TracksModule } from '../tracks/tracks.module';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
    imports: [
        forwardRef(() => TracksModule),
        forwardRef(() => FavoritesModule),
        DatabaseModule,
    ],
    controllers: [AlbumsController],
    providers: [AlbumsService],
    exports: [AlbumsService],
})
export class AlbumsModule { }