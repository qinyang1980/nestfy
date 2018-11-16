import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @ApiModelProperty()
  public name: string;

  @IsString()
  @ApiModelProperty()
  public description: string;

  @IsString()
  @ApiModelProperty()
  public filename: string;

  @IsInt()
  @ApiModelProperty()
  public views: number;

  @IsBoolean()
  @ApiModelProperty()
  public isPublished: boolean;
}
