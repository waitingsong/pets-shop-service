import * as assert from 'assert';

import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like, In } from 'typeorm';

import { AppointmentModel } from '../model/appointment';
import {
  QueryDTO,
  CreateDTO,
  UpdateDTO,
  ProgressDTO,
} from '../dto/appointment';
import MyError from '../util/my-error';

@Provide()
export class AppointmentService {
  @InjectEntityModel(AppointmentModel)
  appointmentModel: Repository<AppointmentModel>;

  /**
   * 分页查询预约单列表
   * @param {QueryDTO} params
   */
  async queryAppointment(params: QueryDTO) {
    const { pageSize, current, sorter, ...filter } = params;
    const where: any = {};
    const order: any = { id: 'DESC' };

    // 排序方式
    if (sorter) {
      const [column, sort] = sorter.split('_');
      order[column] = sort;
    }

    // 模糊匹配id
    if (filter.id) {
      where.id = Like(filter.id);
    }

    // 模糊匹配名称
    if (filter.nameName) {
      where.nameName = Like(`${filter.nameName}%`);
    }
    const [list, total] = await this.appointmentModel.findAndCount({
      where,
      order,
      take: pageSize,
      skip: pageSize * (current - 1),
    });

    return {
      current,
      pageSize,
      total,
      list,
    };
  }

  /**
   * 通过ID获取单条预约单数据
   * @param {String} id
   */
  async getAppointmentById(id: string) {
    const row = await this.appointmentModel
      .createQueryBuilder()
      .select()
      .where({ id: id })
      .getOne();
    return row;
  }

  /**
   * 创建预约单
   * @param {CreateDTO} params 预约单参数
   */
  async createAppointment(params: CreateDTO) {
    let record = new AppointmentModel();
    record = this.appointmentModel.merge(record, params);

    const created = await this.appointmentModel.save(record);
    return created;
  }

  /**
   * 更新预约单
   * @param {UpdateDTO} params 更新预约单参数
   */
  async updateAppointment(params: UpdateDTO) {
    const { id, ...columns } = params;
    return this.appointmentModel
      .createQueryBuilder()
      .update()
      .set(columns)
      .where('id = :id', { id })
      .execute();
  }

  /**
   * 批量删除多条预约单数据(忽略关联表的数据)
   * @param {string[]} ids 预约单id
   */
  async removeAppointmentByIds(ids: string[]) {
    return (
      this.appointmentModel
        .createQueryBuilder()
        // .softDelete() // 软删除例子
        .delete()
        .where({
          id: In(ids),
        })
        .execute()
    );
  }

  /**
   * 检查预约单是否存在于数据库，自动抛错
   * @param {string[]} ids 预约单id
   */
  async checkAppointmentExists(ids: string[] = []) {
    const count = await this.appointmentModel.count({
      where: {
        id: In(ids),
      },
    });

    assert.deepStrictEqual(
      count,
      ids.length,
      new MyError('预约单不存在，请检查', 400)
    );
  }

  /**
   * 扭转预约单服务状态
   * @param {ProgressDTO} params 扭转预约单参数
   */
  async progressAppointment(params: ProgressDTO) {
    const { id, ...columns } = params;
    return this.appointmentModel
      .createQueryBuilder()
      .update()
      .set(columns)
      .where('id = :id', { id })
      .execute();
  }
}