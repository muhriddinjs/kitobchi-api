import { Module } from '@nestjs/common';
import { BookListingService } from './book_listing.service';
import { BookListingController } from './book_listing.controller';

@Module({
  controllers: [BookListingController],
  providers: [BookListingService],
})
export class BookListingModule {}
