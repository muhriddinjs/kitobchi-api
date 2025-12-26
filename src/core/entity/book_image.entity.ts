import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { bookListingEntity } from './book_listing.entity';

@Entity('book_images')
export class bookImageEntity extends BaseEntity {
  @ManyToOne(() => bookListingEntity, (book) => book.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: bookListingEntity;
  @Column()
  imageUrl: string;

  @Column()
  position: number;
}
