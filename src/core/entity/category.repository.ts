import { Repository } from 'typeorm';
import { categoryEntity } from '../entity/category.entity';

export type CategoryRepository = Repository<categoryEntity>;
