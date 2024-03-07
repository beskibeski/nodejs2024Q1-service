import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBaseService } from 'src/database/database.service';
import { ITrack } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private databaseService: DataBaseService) {}

  public async create(createTrackDto: CreateTrackDto) {
    const track: ITrack = {
      id: randomUUID(),
      albumId: null,
      artistId: null,
      ...createTrackDto,
    };
    return await this.databaseService.setTrack(track);
  }

  public async findAll() {
    return await this.databaseService.getTracks();
  }

  public async findOne(id: string) {
    return await this.databaseService.getTrackById(id);
  };  

  public async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.databaseService.changeTrackById(id, updateTrackDto);
  }

  public async remove(id: string) {
    return await this.databaseService.deleteTrackById(id);
  }
}
