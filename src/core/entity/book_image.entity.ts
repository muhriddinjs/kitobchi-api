import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
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
