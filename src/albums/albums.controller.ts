import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, HttpCode, NotFoundException, Put, ValidationPipe } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';


@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    if (await this.albumsService.findOne(id)) {
      return await this.albumsService.findOne(id);
    }
    throw new NotFoundException(`There is no album with id: ${id}`);
    
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.albumsService.update(id, updateAlbumDto);
    if (updatedAlbum) {
      return updatedAlbum;
    }  
    throw new NotFoundException(`There is no album with id: ${id}`);          
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedAlbum = await this.albumsService.remove(id);
    if (deletedAlbum) {
      return deletedAlbum;
    };
    throw new NotFoundException(`There is no album with id: ${id}`);    
  }
}
