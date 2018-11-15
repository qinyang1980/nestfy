import { Auth } from '../../../candy';
import { ApiUseTags } from '../../../candy/swagger';
import { ForbiddenException, ParseIntPipe } from '../../../candy/web/common';
import { Body, Controller, Delete, Get, Param, Post, Put } from '../../../candy/web/common';
import config from '../../common/config';
import logger from '../../common/utils/logger';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

// @ApiUseTags('photos')
@Controller('photos')
export class PhotoController {
  constructor(private readonly _photoService: PhotoService) {}

  // @Post()
  // public async create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
  //   return this._photoService.create(createPhotoDto as Photo);
  // }

  @Get()
  public async findAllAndCount(): Promise<any> {
    return this._photoService.findAllAndCount();
  }

  // @Get('findAll')
  // public async findAll(): Promise<any> {
  //   return this._photoService.findAll();
  // }

  // @Get(':id')
  // @Auth(false)
  // public findOne(
  //   @Param('id', new ParseIntPipe())
  //   id: number
  // ): Promise<Photo> {
  //   return this._photoService.findOneById(id);
  // }

  // @Put(':id')
  // public async modify(
  //   @Param('id', new ParseIntPipe())
  //   id: number,
  //   @Body() photo: CreatePhotoDto
  // ): Promise<Photo> {
  //   return this._photoService.modify(id, photo as Photo);
  // }

  // @Delete(':id')
  // public async remove(
  //   @Param('id', new ParseIntPipe())
  //   id: number
  // ): Promise<any> {
  //   return this._photoService.remove(id);
  // }

  // // 异常测试
  // @Get('exception/testing')
  // public async exceptionTesting(): Promise<any> {
  //   throw new Error('test');
  // }

  // @Get('exception/normal-error')
  // public async testNormalError(): Promise<any> {
  //   throw new Error('test');
  // }

  // @Get('exception/special-error')
  // public async testForbiddenError(): Promise<any> {
  //   throw new ForbiddenException('forbidden');
  // }

  // @Get('exception/config-error')
  // public async testConfigError(): Promise<any> {
  //   throw config.error(-1300);
  // }

  // @Get('exception/programming-error')
  // public async testProgrammingError(): Promise<any> {
  //   return (this as any).func2222();
  // }

  // @Get('exception/database-error')
  // public async testDatabaseError(): Promise<any> {
  //   //return this._photoService.dbExceptionTest();
  // }

  // @Post('exception/validation-error')
  // public async testValidationError(@Body() createPhotoDto: CreatePhotoDto): Promise<any> {
  //   return 3;
  // }
}
