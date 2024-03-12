import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsDefined()
  @IsString()
  name: string;
  @IsDefined()
  @IsNumber()
  duration: number;
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}
