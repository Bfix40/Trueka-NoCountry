import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categories CRUD')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiCreatedResponse({
    description: 'Category has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'Bad request (Category already exists).',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ description: 'Category list' })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOkResponse({ description: 'Category by id' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOkResponse({ description: 'Category successfully updated' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
