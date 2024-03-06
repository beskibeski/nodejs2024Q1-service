import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, HttpCode, NotFoundException, Put } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';


@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe) id: string) {
    if (await this.albumsService.findOne(id)) {
      return this.albumsService.findOne(id);
    } ;
    throw new NotFoundException(`There is no artist with id: ${id}`);    
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (await this.albumsService.findOne(id)) {
      this.albumsService.update(id, updateAlbumDto);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }      
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.albumsService.findOne(id)) {
      this.albumsService.remove(id);
    } else {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }
}
