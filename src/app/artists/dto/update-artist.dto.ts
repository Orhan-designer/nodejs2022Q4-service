/* eslint-disable prettier/prettier */
import { CreateArtistDto } from './create-artist.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}