/* eslint-disable prettier/prettier */
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    ValidateIf,
    Min,
    Max,
} from 'class-validator';

export class CreateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    @Max(new Date().getFullYear())
    year: number;

    @IsString()
    @ValidateIf((_, value) => value !== null)
    artistId: string | null;
}