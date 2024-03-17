import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist, IArtist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { FavoriteArtist } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(FavoriteArtist)
    private readonly favoriteArtistRepository: Repository<FavoriteArtist>,
  ) {}

  public async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    return await this.artistRepository.save(artist);
  }

  public async findAll() {
    return await this.artistRepository.find();
  }

  public async getArtistById(id: string) {
    return await this.artistRepository.findOne({ where: { id } });
  }

  public async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (updatedArtist) {
      const updatedArtistResponse: IArtist = {
        ...updatedArtist,
        ...updateArtistDto,
      };
      await this.artistRepository.save(updateArtistDto);
      return updatedArtistResponse;
    }
    return undefined;
  }

  public async remove(id: string) {
    const deletedArtist = await this.artistRepository.findOne({ where: { id } });
    if (deletedArtist) {
      await this.artistRepository.delete(id);     
    }
    return deletedArtist;
  }
}
