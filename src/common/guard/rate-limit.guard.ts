import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RATE_LIMIT_KEY } from 'src/common/decorator/rate-limit.decorator';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redis: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.getAllAndOverride<{
      limitCount?: number;
      ttlSeconds?: number;
    }>(RATE_LIMIT_KEY, [context.getHandler(), context.getClass()]);

    const limitCount = options?.limitCount ?? 100;
    const ttlSeconds = options?.ttlSeconds ?? 60;

    const req = context.switchToHttp().getRequest();
    const userId = req?.user?.id ?? `${req.ip}_${req.headers['user-agent']}`;
    const key = `rate_limit_${req.originalUrl}_${userId}`;

    const currentCount = await this.redis.get(key);

    if (!currentCount) {
      await this.redis.set(key, 1, ttlSeconds);
      return true;
    }
    const count = Number(currentCount);

    if (count >= limitCount) {
      throw new HttpException(
        `Rate limit exceeded: only ${limitCount} requests allowed per ${ttlSeconds} seconds`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.redis.set(key, count + 1, ttlSeconds);
    return true;
  }
}
