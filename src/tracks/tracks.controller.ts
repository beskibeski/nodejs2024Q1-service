import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  public async create(
    @Body(new ValidationPipe()) createTrackDto: CreateTrackDto,
  ) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  public async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const foundTrack = await this.tracksService.findOne(id);
    if (foundTrack) {
      return foundTrack;
    }
    throw new NotFoundException(`There is no track with id: ${id}`);
  }

  @Put(':id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.tracksService.update(id, updateTrackDto);
    if (updatedTrack) {
      return updatedTrack;
    }
    throw new NotFoundException(`There is no track with id: ${id}`);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedTrack = await this.tracksService.remove(id);
    if (deletedTrack) {
      return deletedTrack;
    }
    throw new NotFoundException(`There is no track with id: ${id}`);
  }
}
