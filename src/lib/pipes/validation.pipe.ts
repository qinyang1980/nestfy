import { BadRequestException, Injectable } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private options: ValidatorOptions;
  public constructor(validatorOptions: ValidatorOptions) {
    this.options = validatorOptions;
  }

  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, this.options);

    if (errors.length <= 0) {
      return object; // 这里需要返回对象
    }

    const err = new BadRequestException(
      `You have an error in your request's body. Check 'errors' field for more details!`,
    );
    (err as any).errors = errors;

    throw err;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
