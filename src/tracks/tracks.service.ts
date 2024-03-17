import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack, Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteTrack } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(FavoriteTrack)
    private readonly favoriteTrackRepository: Repository<FavoriteTrack>,
  ) {}

  public async create(createTrackDto: CreateTrackDto) {
    const track: ITrack = {
      id: randomUUID(),
      albumId: null,
      artistId: null,
      ...createTrackDto,
    };
    return await this.trackRepository.save(track);
  }

  public async findAll() {
    return await this.trackRepository.find();
  }

  public async findOne(id: string) {
    return await this.trackRepository.findOne({ where: { id } });
  }

  public async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.trackRepository.findOne({ where: { id } });
    if (updatedTrack) {
      const updatedTrackResponse: ITrack = {
        ...updatedTrack,
        ...updateTrackDto,
      };
      await this.trackRepository.save(updatedTrackResponse);
      return updatedTrackResponse;
    }
    return undefined;
  }

  public async remove(id: string) {
    const deletedTrack = await this.trackRepository.findOne({ where: { id } });
    if (deletedTrack) {
      await this.trackRepository.delete(id);      
    }
    return deletedTrack;
  }
}
