import { HttpStatus } from '@nestjs/common';

/**
 * [errno, httpCode, message]
 */
export declare type ICandyErrorAttribute = Array<string | number>;

export interface ICandyError {
  // base ERROR fields
  message: string;
  stack?: string;
  errno: number;

  // SQL error fields
  code?: string;
  sqlState?: string;
  index?: number;

  // validation error field
  details?: object[];

  // extended fields
  httpCode: HttpStatus;
}
