import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private databaseService: DataBaseService) {}

  public async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    return this.databaseService.setArtist(artist);
  }

  public async findAll() {
    return this.databaseService.getArtists();
  }

  public async findOne(id: string) {    
    if (await this.databaseService.getArtistById(id)) {
      return this.databaseService.getArtistById(id);
    }
    return undefined;
  };

  update(id: string, updateArtistDto: UpdateArtistDto) {
    this.databaseService.changeArtistById(id, updateArtistDto);
  }

  public async remove(id: string) {
    this.databaseService.deleteArtistById(id);
  }
}
