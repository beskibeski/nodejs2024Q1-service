import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, IAlbum } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>
  ) {}

  public async create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = {
      id: randomUUID(),
      artistId: null,
      ...createAlbumDto,
    };
    return await this.albumRepository.save(album);
  }

  public async getAll() {
    return await this.albumRepository.find();
  }

  public async findOne(id: string) {
    return await this.albumRepository.findOne({ where: { id }});
  }

  public async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.albumRepository.findOne({ where: { id } });    
    if (updatedAlbum) {
      const updatedAlbumResponse: IAlbum = { ...updatedAlbum, ...updateAlbumDto };
      await this.albumRepository.save(updatedAlbumResponse);
      return updatedAlbumResponse;
    };
    return undefined;
  }

  public async remove(id: string) {
    return await this.albumRepository.findOne({ where: { id } }) ? await this.albumRepository.delete(id) : undefined;
  }
}
