import { Module } from '@nestjs/common';
import { BookImageService } from './book_image.service';
import { BookImageController } from './book_image.controller';

@Module({
  controllers: [BookImageController],
  providers: [BookImageService],
})
export class BookImageModule {}
