import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for 404 HTTP error.
 */
export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundError.prototype);

    this.name = 'NotFoundError';

    if (message) {
      this.message = message;
    }
  }
}
