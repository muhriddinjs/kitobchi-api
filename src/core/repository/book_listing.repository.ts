import { Repository } from 'typeorm';
import { bookListingEntity } from '../entity/book_listing.entity';

export type BookListingRepository = Repository<bookListingEntity>;
