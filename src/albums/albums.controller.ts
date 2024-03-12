import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  public async create(
    @Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  public async findAll() {
    return await this.albumsService.getAll();
  }

  @Get(':id')
  public async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const foundAlbum = await this.albumsService.findOne(id);
    if (foundAlbum) {
      return foundAlbum;
    }
    throw new NotFoundException(`There is no album with id: ${id}`);
  }

  @Put(':id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumsService.update(id, updateAlbumDto);
    if (updatedAlbum) {
      return updatedAlbum;
    }
    throw new NotFoundException(`There is no album with id: ${id}`);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedAlbum = await this.albumsService.remove(id);
    if (deletedAlbum) {
      return deletedAlbum;
    }
    throw new NotFoundException(`There is no album with id: ${id}`);
  }
}
