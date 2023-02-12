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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [UsersModule, DatabaseModule, ArtistsModule, TracksModule, AlbumsModule, FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true, envFilePath: '../.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (_config: ConfigService) => ({
        type: _config.get<'aurora-postgres'>('TYPEORM_CONNECTION'),
        username: _config.get<string>('TYPEORM_USERNAME'),
        password: _config.get<string>('TYPEORM_PASSWORD'),
        database: _config.get<string>('TYPEORM_DATABASE'),
        port: _config.get<number>('TYPEORM_PORT'),
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }