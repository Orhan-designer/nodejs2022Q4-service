/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { ArtistsModule } from './app/artists/artists.module';
import { DatabaseModule } from './database/database.module';
import { TracksModule } from './app/tracks/tracks.module';
import { AlbumsModule } from './app/albums/album.module';
import { FavoritesModule } from './app/favorites/favorites.module';
@Module({
  imports: [UsersModule, DatabaseModule, ArtistsModule, TracksModule, AlbumsModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }