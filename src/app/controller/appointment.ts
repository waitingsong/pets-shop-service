import * as assert from 'assert';

import {
  Controller,
  Get,
  Provide,
  Inject,
  Query,
  ALL,
  Validate,
  Post,
  Del,
  Patch,
  Body,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import { AppointmentService } from '../service/appointment';
import {
  QueryDTO,
  CreateDTO,
  UpdateDTO,
  ShowDTO,
  RemoveDTO,
  ProgressDTO,
} from '../dto/appointment';
import MyError from '../util/my-error';

@Provide()
@Controller('/appointment', {
  tagName: '预约单管理',
  description: '包含预约单的增、删、改、查',
})
export class AppointmentController {
  @Inject('appointmentService')
  service: AppointmentService;

  @Get('/query', {
    summary: '获取预约单列表',
    description: '分页接口，查询预约单列表',
  })
  @Validate()
  async query(ctx: Context, @Query(ALL) query: QueryDTO) {
    const result = await this.service.queryAppointment(query);
    ctx.helper.success(result);
  }

  @Get('/show', {
    summary: '获取单个预约单详情',
    description: '获取预约单的详细信息，包括其关联的对象',
  })
  @Validate()
  async show(ctx: Context, @Query(ALL) query: ShowDTO) {
    const result = await this.service.getAppointmentById(query.id);
    assert.ok(result, new MyError('预约单不存在，请检查', 400));
    ctx.helper.success(result);
  }

  @Post('/create', {
    summary: '创建预约单',
    description: '',
  })
  @Validate()
  async create(ctx: Context, @Body(ALL) params: CreateDTO) {
    const result = await this.service.createAppointment(params);
    ctx.helper.success(result, null, 201);
  }

  @Patch('/update', {
    summary: '更新预约单数据',
    description: '可更新预约单一个或多个字段',
  })
  @Validate()
  async update(ctx: Context, @Body(ALL) params: UpdateDTO) {
    // 检查预约单是否存在
    await this.service.checkAppointmentExists([params.id]);

    const { affected } = await this.service.updateAppointment(params);
    assert(affected, new MyError('更新失败，请检查', 400));

    ctx.helper.success(null, null, 204);
  }

  @Del('/remove', {
    summary: '删除预约单',
    description: '关联关系表不会删除其中的内容，可以同时删除多个预约单',
  })
  @Validate()
  async remove(ctx: Context, @Body(ALL) params: RemoveDTO) {
    // 检查预约单是否存在
    await this.service.checkAppointmentExists(params.ids);

    const total = await this.service.removeAppointmentByIds(params.ids);
    assert(total, new MyError('删除失败，请检查', 400));

    ctx.helper.success(null, null, 204);
  }

  @Post('/progress', {
    summary: '扭转服务状态',
    description: '关联关系表不会删除其中的内容，可以同时删除多个预约单',
  })
  @Validate()
  async progress(ctx: Context, @Body(ALL) params: ProgressDTO) {
    // 检查预约单是否存在
    await this.service.checkAppointmentExists([params.id]);

    const total = await this.service.progressAppointment(params);
    assert(total, new MyError('扭转状态失败，请检查', 400));

    ctx.helper.success(null, null, 204);
  }
}
