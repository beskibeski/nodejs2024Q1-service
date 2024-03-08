import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DataBaseService) {}

  public async findAll() {
    return await this.databaseService.getFavorites();
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
