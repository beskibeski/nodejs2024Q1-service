import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DataBaseService) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return this.databaseService.getFavorites();
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
