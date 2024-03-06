import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  constructor(private databaseService: DataBaseService) {}

  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll() {
    return this.databaseService.getTracks();
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
