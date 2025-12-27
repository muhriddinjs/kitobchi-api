import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { userEntity } from './user.entity';

@Entity('profiles')
export class profileEntity extends BaseEntity {
  @OneToOne(() => userEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: userEntity;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  telegramUsername: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  bio: string;
}
