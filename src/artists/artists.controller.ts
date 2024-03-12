import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  public async create(
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
  ) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  public async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const foundArtist = await this.artistsService.getArtistById(id);
    if (foundArtist) {
      return foundArtist;
    }
    throw new NotFoundException(`There is no artist with id: ${id}`);
  }

  @Put(':id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ) {
    const foundArtist = await this.artistsService.update(id, updateArtistDto);
    if (foundArtist) {
      return foundArtist;
    }
    throw new NotFoundException(`There is no artist with id: ${id}`);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedArtist = await this.artistsService.remove(id);
    if (deletedArtist) {
      return deletedArtist;
    }
    throw new NotFoundException(`There is no artist with id: ${id}`);
  }
}
