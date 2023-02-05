/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/album.module';
import { ArtistsModule } from '../artists/artists.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        forwardRef(() => TracksModule),
        forwardRef(() => AlbumsModule),
        forwardRef(() => ArtistsModule),
        DatabaseModule,
    ],
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService],
})
export class FavoritesModule { }