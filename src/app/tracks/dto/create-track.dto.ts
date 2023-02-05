/* eslint-disable prettier/prettier */
import {
    IsNotEmpty,
    IsString,
    ValidateIf,
    Min,
    Max,
    IsInt,
} from 'class-validator';

export class CreateTrackDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @ValidateIf((_, value) => value !== null)
    artistId: string | null;

    @IsString()
    @ValidateIf((_, value) => value !== null)
    albumId: string | null;

    @IsInt()
    @Min(0)
    @Max(1000)
    duration: number;
}