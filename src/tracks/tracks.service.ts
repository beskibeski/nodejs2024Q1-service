import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBaseService } from 'src/database/database.service';
import { ITrack } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private databaseService: DataBaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track: ITrack = {
      id: randomUUID(),
      albumId: null,
      artistId: null,
      ...createTrackDto,
    };
    return this.databaseService.setTrack(track);
  }

  async findAll() {
    return this.databaseService.getTracks();
  }

  async findOne(id: string) {
    if (await this.databaseService.getTrackById(id)) {
      return this.databaseService.getTrackById(id);
    }
    return undefined;
  };  

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    this.databaseService.changeTrackById(id, updateTrackDto);
  }

  async remove(id: string) {
    this.databaseService.deleteTrackById(id);
  }
}
