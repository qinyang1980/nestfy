import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for 500 HTTP error.
 */
export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR);
    Object.setPrototypeOf(this, InternalServerError.prototype);

    this.name = 'InternalServerError';

    if (message) {
      this.message = message;
    }
  }
}
