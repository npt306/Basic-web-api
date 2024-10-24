import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new film', description: 'Create a new film in the database'})
  @ApiResponse({status: 201, description: 'The film has been successfully created', type: CreateFilmDto})
  @ApiBody({type: CreateFilmDto, description: 'The data to create a new film'})
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all films', description: 'Get all films from the database'})
  @ApiResponse({status: 200, description: 'Return all films', isArray: true, type: CreateFilmDto})
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a film by ID', description: 'Get a film from the database by its ID'})
  @ApiResponse({status: 200, description: 'Return a film by its ID', type: CreateFilmDto})
  @ApiParam({name: 'id', type: String, description: 'Film ID'})
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a film by ID', description: 'Update a film in the database by its ID'})
  @ApiResponse({status: 200, description: 'Return the updated film', type: CreateFilmDto})
  @ApiParam({name: 'id', type: String, description: 'Film ID'})
  @ApiBody({type: UpdateFilmDto, description: 'The data to update a film'})
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @ApiOperation({summary: 'Delete a film by ID', description: 'Delete a film from the database by its ID'})
  @ApiResponse({status: 200, description: 'Return the deleted film', type: CreateFilmDto})
  @ApiParam({name: 'id', type: String, description: 'Film ID'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(id);
  }
}
