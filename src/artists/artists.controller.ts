import { Controller, Get, Post, Body, Put, Param, Delete, ParseUUIDPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe) id: string) {
    if (await this.artistsService.findOne(id)) {
      return this.artistsService.findOne(id);
    } ;
    throw new NotFoundException(`There is no artist with id: ${id}`);    
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (await this.artistsService.findOne(id)) {
      this.artistsService.update(id, updateArtistDto);
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }      
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.artistsService.findOne(id)) {
      this.artistsService.remove(id);
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }
}
