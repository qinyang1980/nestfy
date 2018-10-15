import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for 401 HTTP error.
 */
export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.UNAUTHORIZED);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);

    this.name = 'UnauthorizedError';

    if (message) {
      this.message = message;
    }
  }
}
