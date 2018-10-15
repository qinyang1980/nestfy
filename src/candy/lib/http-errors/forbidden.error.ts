import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for 403 HTTP error.
 */
export class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.FORBIDDEN);
    Object.setPrototypeOf(this, ForbiddenError.prototype);

    this.name = 'ForbiddenError';

    if (message) {
      this.message = message;
    }
  }
}
