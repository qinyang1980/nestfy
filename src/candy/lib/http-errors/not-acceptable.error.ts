import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for 406 HTTP error.
 */
export class NotAcceptableError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.NOT_ACCEPTABLE);
    Object.setPrototypeOf(this, NotAcceptableError.prototype);

    this.name = 'NotAcceptableError';

    if (message) {
      this.message = message;
    }
  }
}
