import { HttpStatus } from '@nestjs/common';
import { HttpError } from './http.error';

/**
 * Exception for todo HTTP error.
 */
export class MethodNotAllowedError extends HttpError {
  constructor(message?: string) {
    super(HttpStatus.METHOD_NOT_ALLOWED);
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);

    this.name = 'MethodNotAllowedError';

    if (message) {
      this.message = message;
    }
  }
}
