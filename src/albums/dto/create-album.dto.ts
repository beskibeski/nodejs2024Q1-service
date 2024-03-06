import { IAlbum } from "../entities/album.entity";

export class CreateAlbumDto implements Partial<IAlbum>{
  name: string;
  year: number;
  artistId?: string | null;
}
