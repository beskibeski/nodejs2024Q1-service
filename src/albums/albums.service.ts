import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataBaseService } from 'src/database/database.service';
import { IAlbum } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private databaseService: DataBaseService) {}

  public async create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = {
      id: randomUUID(),
      artistId: null,
      ...createAlbumDto,
    };
    return await this.databaseService.setAlbum(album);
  }

  public async getAll() {
    return await this.databaseService.getAlbums();
  }

  public async findOne(id: string) {
    return await this.databaseService.getAlbumById(id);
  }

  public async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.databaseService.changeAlbumById(id, updateAlbumDto);
  }

  public async remove(id: string) {
    return await this.databaseService.deleteAlbumById(id);
  }
}
