import { Repository } from 'typeorm';
import { likeEntity } from '../entity/like.entity';

export type LikeRepository = Repository<likeEntity>;
