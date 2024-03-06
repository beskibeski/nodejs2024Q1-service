import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, NotFoundException } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe) id: string) {
    if (await this.tracksService.findOne(id)) {
      return this.tracksService.findOne(id);
    } ;
    throw new NotFoundException(`There is no track with id: ${id}`);    
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (await this.tracksService.findOne(id)) {
      this.tracksService.update(id, updateTrackDto);
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }      
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.tracksService.findOne(id)) {
      this.tracksService.remove(id);
    } else {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
  }
}
