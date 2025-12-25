// likes.entity.ts
import { BaseEntity } from 'src/common/database/base.entity';
import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { bookListingEntity } from './book_listing.entity';
import { userEntity } from './user.entity';

@Entity('likes')
@Unique(['user', 'book'])
export class likeEntity extends BaseEntity {
  @ManyToOne(() => userEntity, (user) => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: userEntity;

  @ManyToOne(() => bookListingEntity, (book) => book.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: bookListingEntity;
}
