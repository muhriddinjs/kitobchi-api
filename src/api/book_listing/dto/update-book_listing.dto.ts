import { PartialType } from '@nestjs/swagger';
import { CreateBookListingDto } from './create-book_listing.dto';

export class UpdateBookListingDto extends PartialType(CreateBookListingDto) {}
