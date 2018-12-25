import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsInt, IsString } from 'class-validator';

export class CreatePhotoDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  public name: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
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
