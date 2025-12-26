// categories.entity.ts
import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { bookListingEntity } from './book_listing.entity';

@Entity('categories')
export class categoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => bookListingEntity, (book) => book.category)
  books: bookListingEntity[];
}
