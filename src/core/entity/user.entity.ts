// users.entity.ts
import { BaseEntity } from 'src/common/database/base.entity';
import { UnifiedRoles, UserStatus } from 'src/common/enum';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { bookListingEntity } from './book_listing.entity';
import { likeEntity } from './like.entity';
import { profileEntity } from './profile.entity';

@Entity('users')
export class userEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UnifiedRoles, default: UnifiedRoles.USER })
  role: UnifiedRoles;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @OneToOne(() => profileEntity, (profile) => profile.user)
  profile: profileEntity;

  @OneToMany(() => bookListingEntity, (book) => book.user)
  bookListings: bookListingEntity[];

  @OneToMany(() => likeEntity, (like) => like.user)
  likes: likeEntity[];
}
