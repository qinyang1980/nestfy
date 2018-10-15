import { HttpException } from '@nestjs/common';
import { ArgumentMetadata, HttpStatus, Pipe, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../http-errors/bad-request.error';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length <= 0) {
      console.debug('validation succeed');
      return value;
    }

    const err = new BadRequestError(`You have an error in your request's body. Check 'errors' field for more details!`);
    (err as any).errors = errors;

    throw err;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
