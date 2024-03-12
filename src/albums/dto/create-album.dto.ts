import { IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsDefined()
  name: string;
  @IsDefined()
  year: number;
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
