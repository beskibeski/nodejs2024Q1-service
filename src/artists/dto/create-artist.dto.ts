import { IsBoolean, IsDefined } from "class-validator";
import { IArtist } from "../entities/artist.entity";

export class CreateArtistDto implements Partial<IArtist>{
  @IsDefined()  
  name: string;
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
