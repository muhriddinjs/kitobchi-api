import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RateLimitGuard } from '../guard/rate-limit.guard';

export const RATE_LIMIT_KEY = 'rate_limit_options';

export function RateLimit(limitCount = 100, ttlSeconds = 60) {
  return applyDecorators(
    SetMetadata(RATE_LIMIT_KEY, { limitCount, ttlSeconds }),
    UseGuards(RateLimitGuard),
  );
}
