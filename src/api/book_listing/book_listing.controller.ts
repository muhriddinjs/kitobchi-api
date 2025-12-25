import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookListingService } from './book_listing.service';
import { CreateBookListingDto } from './dto/create-book_listing.dto';
import { UpdateBookListingDto } from './dto/update-book_listing.dto';

@Controller('book-listing')
export class BookListingController {
  constructor(private readonly bookListingService: BookListingService) {}

  @Post()
  create(@Body() createBookListingDto: CreateBookListingDto) {
    return this.bookListingService.create(createBookListingDto);
  }

  @Get()
  findAll() {
    return this.bookListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookListingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookListingDto: UpdateBookListingDto) {
    return this.bookListingService.update(+id, updateBookListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookListingService.remove(+id);
  }
}
