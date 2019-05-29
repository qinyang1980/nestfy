import { SetMetadata } from '@nestjs/common';
import { AUTH_SYMBOL } from '../constants';

/**
 * @author andy.qin
 * @param verifyToken 决定是否验证token
 */
export const Auth = (verifyToken: boolean) => SetMetadata(AUTH_SYMBOL, verifyToken);
