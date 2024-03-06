import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private databaseService: DataBaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
  }

  findAll() {
    return this.databaseService.getArtists();
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
