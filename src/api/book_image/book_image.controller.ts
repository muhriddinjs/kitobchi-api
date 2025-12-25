import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookImageService } from './book_image.service';
import { CreateBookImageDto } from './dto/create-book_image.dto';
import { UpdateBookImageDto } from './dto/update-book_image.dto';

@Controller('book-image')
export class BookImageController {
  constructor(private readonly bookImageService: BookImageService) {}

  @Post()
  create(@Body() createBookImageDto: CreateBookImageDto) {
    return this.bookImageService.create(createBookImageDto);
  }

  @Get()
  findAll() {
    return this.bookImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookImageDto: UpdateBookImageDto) {
    return this.bookImageService.update(+id, updateBookImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookImageService.remove(+id);
  }
}
