import { mixin } from '@nestjs/common';
import { CacheInterceptor } from './cache.interceptor';

export function mixinCacheInterceptor(isCached: () => boolean): any {
  return mixin(class extends CacheInterceptor {
    protected readonly isCached: any = isCached;
  });
}
