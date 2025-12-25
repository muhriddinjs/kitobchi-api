import { Injectable } from '@nestjs/common';
import { CreateBookListingDto } from './dto/create-book_listing.dto';
import { UpdateBookListingDto } from './dto/update-book_listing.dto';

@Injectable()
export class BookListingService {
  create(createBookListingDto: CreateBookListingDto) {
    return 'This action adds a new bookListing';
  }

  findAll() {
    return `This action returns all bookListing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookListing`;
  }

  update(id: number, updateBookListingDto: UpdateBookListingDto) {
    return `This action updates a #${id} bookListing`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookListing`;
  }
}
