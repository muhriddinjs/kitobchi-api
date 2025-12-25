// book-listings.entity.ts
import { BaseEntity } from 'src/common/database/base.entity';
import { ListingStatus, ListingType } from 'src/common/enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { bookImageEntity } from './book_image.entity';
import { categoryEntity } from './category.entity';
import { likeEntity } from './like.entity';
import { userEntity } from './user.entity';

@Entity('book_listings')
export class bookListingEntity extends BaseEntity {
  @ManyToOne(() => userEntity, (user) => user.bookListings)
  @JoinColumn({ name: 'user_id' })
  user: userEntity;

  @ManyToOne(() => categoryEntity, (category) => category.books)
  @JoinColumn({ name: 'category_id' })
  category: categoryEntity;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('text')
  description: string;

  @Column()
  language: string;

  @Column({ type: 'enum', enum: ListingType })
  listingType: ListingType;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column()
  locationName: string;

  @Column('decimal', { precision: 9, scale: 6, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6, nullable: true })
  longitude: number;

  @Column({ type: 'enum', enum: ListingStatus, default: ListingStatus.ACTIVE })
  status: ListingStatus;

  @OneToMany(() => bookImageEntity, (image) => image.book)
  images: bookImageEntity[];

  @OneToMany(() => likeEntity, (like) => like.book)
  likes: likeEntity[];
}
