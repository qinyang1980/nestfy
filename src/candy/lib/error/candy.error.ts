import { ICandyError, ICandyErrorAttribute } from './error.interface';

export class CandyError extends Error {
  public errno: number;
  public httpCode: number;
  public message: string;

  constructor(attribute: ICandyErrorAttribute) {
    super();

    Object.setPrototypeOf(this, CandyError.prototype);

    this.errno = attribute[0] as number;
    this.httpCode = attribute[1] as number;
    this.message = attribute[2] as string;

    this.stack = new Error().stack;
  }
}
