import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiModelProperty } from '../../../../candy/swagger';

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
