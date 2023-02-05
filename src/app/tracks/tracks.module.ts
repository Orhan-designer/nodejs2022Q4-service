/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
    imports: [DatabaseModule, forwardRef(() => FavoritesModule)],
    controllers: [TracksController],
    providers: [TracksService],
    exports: [TracksService],
})
export class TracksModule { }