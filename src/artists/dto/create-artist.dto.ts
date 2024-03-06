import { IArtist } from "../entities/artist.entity";

export class CreateArtistDto implements Partial<IArtist>{  
  name: string;  
  grammy: boolean;
}
