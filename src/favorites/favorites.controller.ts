import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  public async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('album/:id')
  public async addAlbumToFavoritesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const addedAlbum = await this.favoritesService.addAlbumToFavoritesById(id);
    if (addedAlbum) {
      return addedAlbum;
    }
    throw new UnprocessableEntityException('There is no album with id: ${id}');
  }

  @Delete('album/:id')
  @HttpCode(204)
  public async deleteAlbumFromFavoritesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const deletedAlbum =
      await this.favoritesService.deleteAlbumFromFavoritesById(id);
    if (deletedAlbum) {
      return deletedAlbum;
    }
    throw new NotFoundException('There is no album with id: ${id}');
  }

  @Post('artist/:id')
  public async addArtistToFavoritesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const addedArtist = await this.favoritesService.addArtistToFavoritesById(
      id,
    );
    if (addedArtist) {
      return addedArtist;
    }
    throw new UnprocessableEntityException('There is no artist with id: ${id}');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  public async deleteArtistFromFavoritesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const deletedArtist =
      await this.favoritesService.deleteArtistFromFavoritesById(id);
    if (deletedArtist) {
      return true;
    }
    throw new NotFoundException('There is no artist with id: ${id}');
  }

  @Post('track/:id')
  public async addTrackToFavoritesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const addedTrack = await this.favoritesService.addTrackToFavoritesById(id);
    if (addedTrack) {
      return addedTrack;
    }
    throw new UnprocessableEntityException('There is no track with id: ${id}');
  }

  @Delete('track/:id')
  @HttpCode(204)
  public async deleteTrackFromFavoritesById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const deletedTrack =
      await this.favoritesService.deleteTrackFromFavoritesById(id);
    if (deletedTrack) {
      return deletedTrack;
    }
    throw new NotFoundException('There is no track with id: ${id}');
  }
}
