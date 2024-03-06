import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataBaseService } from 'src/database/database.service';
import { IAlbum } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private databaseService: DataBaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = {
      id: randomUUID(),
      artistId: null,
      ...createAlbumDto,      
    };
    return this.databaseService.setAlbum(album);
  }

  async findAll() {
    return this.databaseService.getAlbums();
  }

  async findOne(id: string) {
    if (await this.databaseService.getAlbumById(id)) {
      return this.databaseService.getAlbumById(id);
    }
    return undefined;  
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.databaseService.changeAlbumById(id, updateAlbumDto);
  }

  async remove(id: string) {
    this.databaseService.deleteAlbumById(id);
  }
}
