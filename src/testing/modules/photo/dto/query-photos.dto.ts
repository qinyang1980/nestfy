import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class QueryPhotosDto {
  @ApiModelProperty({ description: '查询偏移量', required: true })
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  public offset: number;

  @ApiModelProperty({ description: '查询个数', required: true })
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  public limit: number;

  @ApiModelProperty({ description: '名称', required: false })
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}
