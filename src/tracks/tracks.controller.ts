import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, NotFoundException, ValidationPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  };

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {   
    if (await this.tracksService.findOne(id)) {
      return;
    };
    throw new NotFoundException(`There is no track with id: ${id}`);      
  };

  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.tracksService.update(id, updateTrackDto);
    if (updatedTrack) {
      return updatedTrack;
    }      
    throw new NotFoundException(`There is no track with id: ${id}`);    
  };

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedTrack = await this.tracksService.remove(id);
    if (deletedTrack) {
      return deletedTrack;
    };
    throw new NotFoundException(`There is no track with id: ${id}`);
  };
}
