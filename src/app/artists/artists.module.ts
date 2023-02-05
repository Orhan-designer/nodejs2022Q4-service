/* eslint-disable prettier/prettier */
import { Module, forwardRef } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistsController } from "./artists.controller";
import { DatabaseModule } from "src/database/database.module";
import { FavoritesModule } from "../favorites/favorites.module";
import { TracksModule } from "../tracks/tracks.module";
import { AlbumsModule } from "../albums/album.module";

@Module({
    imports: [DatabaseModule,
        forwardRef(() => FavoritesModule),
        forwardRef(() => TracksModule),
        forwardRef(() => AlbumsModule)],
    controllers: [ArtistsController],
    providers: [ArtistsService],
    exports: [ArtistsService]
})

export class ArtistsModule { }