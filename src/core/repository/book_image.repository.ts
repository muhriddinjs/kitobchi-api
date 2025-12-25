import { Repository } from 'typeorm';
import { bookImageEntity } from '../entity/book_image.entity';

export type BookImageRepository = Repository<bookImageEntity>;
