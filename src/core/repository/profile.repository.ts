import { Repository } from 'typeorm';
import { profileEntity } from '../entity/profile.entity';

export type ProfileRepository = Repository<profileEntity>;
