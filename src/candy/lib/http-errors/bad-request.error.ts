import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for 400 HTTP error.
 */
export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.name = 'BadRequestError';

    if (message) {
      this.message = message;
    }
  }
}
