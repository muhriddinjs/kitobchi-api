import { Repository } from 'typeorm';
import { userEntity } from '../entity/user.entity';

export type UserRepository = Repository<userEntity>;
