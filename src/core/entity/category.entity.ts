// categories.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { bookListingEntity } from './book_listing.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('categories')
export class categoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => bookListingEntity, (book) => book.category)
  books: bookListingEntity[];
}
