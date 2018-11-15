import { Repository } from '../../../candy/orm';
import { Injectable } from '../../../candy/web/common';
import { InjectRepository } from '../../../candy/web/typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly _photoRepository: Repository<Photo>
  ) {}

  /**
   * 获取所有photos记录，并且返回总数
   */
  public findAllAndCount(): Promise<[Photo[], number]> {
    return this._photoRepository.findAndCount();
  }

  // /**
  //  * 获取所有photos记录
  //  */
  // public findAll(): Promise<Photo[]> {
  //   return this._photoRepository.find();
  // }

  // /**
  //  * 根据id获取单个photo
  //  */
  // public async findOneById(id: number): Promise<Photo> {
  //   return this._photoRepository.findOne(id);
  // }

  // /**
  //  * 根据photo对象创建一个新的记录
  //  */
  // public async create(photo: Photo): Promise<Photo> {
  //   return this._photoRepository.save(photo);
  // }

  // /**
  //  * 根据id，修改某条记录
  //  */
  // public async modify(id: number, photo: Photo): Promise<Photo> {
  //   photo.id = id;
  //   return this._photoRepository.save(photo);
  // }

  // /**
  //  * 删除某条记录
  //  */
  // public async remove(id: number): Promise<any> {
  //   const photo: Photo = {} as Photo;
  //   photo.id = id;
  //   return this._photoRepository.remove(photo);
  // }

  // /**
  //  * 数据库异常测试
  //  */
  // public async dbExceptionTest(): Promise<any> {
  //   const id: number = 3;
  //   return this._photoRepository
  //     .createQueryBuilder('photo')
  //     .where('photo.id2 = :id', { id })
  //     .getMany();
  // }
}
