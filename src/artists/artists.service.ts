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
    return await this.databaseService.setArtist(artist);
  };

  public async findAll() {
    return await this.databaseService.getArtists();
  };

  public async getArtistById(id: string) {
    return await this.databaseService.getArtistById(id);
  };

  public async update(id: string, updateArtistDto: UpdateArtistDto) {    
    return await this.databaseService.changeArtistById(id, updateArtistDto);
  };

  public async remove(id: string) {
    return await this.databaseService.deleteArtistById(id);
  }
}
