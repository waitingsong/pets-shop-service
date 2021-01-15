import { Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';

/**
 * 查询预约单列表参数
 */
export class QueryDTO {
  @CreateApiPropertyDoc('当前页')
  @Rule(RuleType.number().min(1).max(100000).default(1).optional())
  current?: number;

  @CreateApiPropertyDoc('每页数量')
  @Rule(RuleType.number().min(1).max(1000).default(10).optional())
  pageSize?: number;

  @CreateApiPropertyDoc('筛选字段-id')
  @Rule(RuleType.string().trim().max(19).optional())
  id?: string;

  @CreateApiPropertyDoc('筛选字段-名称')
  @Rule(RuleType.string().trim().max(50).optional())
  userName?: string;

  @CreateApiPropertyDoc('筛选字段-联系电话')
  @Rule(RuleType.string().trim().max(11).optional())
  userPhone?: string;

  @CreateApiPropertyDoc('筛选字段-服务状态')
  @Rule(RuleType.string().trim().max(1).optional())
  status?: string;

  @CreateApiPropertyDoc(
    '排序字段，以字段名加下划线组合，不能有特殊字符和不存在的字段。例如: name_ascend 或者 name_descend'
  )
  @Rule(
    RuleType.string()
      .trim()
      .max(50)
      .regex(/^[a-zA-Z]*(_ascend|_descend)$/)
      .optional()
      .allow('')
  )
  sorter?: string;
}

/**
 * 获取单条预约单参数
 */
export class ShowDTO {
  @CreateApiPropertyDoc('预约单的id')
  @Rule(RuleType.string().trim().max(19).required())
  id: string;
}

/**
 * 删除预约单参数
 */
export class RemoveDTO {
  @CreateApiPropertyDoc('预约单id的数组')
  @Rule(
    RuleType.array().items(RuleType.string().trim().max(19)).min(1).required()
  )
  ids: string[];
}

/**
 * 创建预约单参数
 */
export class CreateDTO {
  @CreateApiPropertyDoc('客户姓名')
  @Rule(RuleType.string().trim().max(50).required())
  userName: string;

  @CreateApiPropertyDoc('联系电话')
  @Rule(RuleType.string().trim().max(11).required())
  userPhone: string;

  @CreateApiPropertyDoc('客户性别')
  @Rule(RuleType.number().max(999))
  userGenderType: number;

  @CreateApiPropertyDoc('预约时间')
  @Rule(RuleType.date())
  preTime: Date;

  @CreateApiPropertyDoc('宠物类型')
  @Rule(RuleType.number().max(999).required())
  petsType: number;

  @CreateApiPropertyDoc('服务类型')
  @Rule(RuleType.number().max(999).required())
  serviceType: number;

  @CreateApiPropertyDoc('描述')
  @Rule(RuleType.string().trim().max(255).optional())
  description: string;
}

/**
 * 更新预约单参数
 */
export class UpdateDTO {
  @CreateApiPropertyDoc('预约单的id')
  @Rule(RuleType.string().trim().max(19).required())
  id: string;

  @CreateApiPropertyDoc('客户姓名')
  @Rule(RuleType.string().trim().max(50).optional())
  userName: string;

  @CreateApiPropertyDoc('联系电话')
  @Rule(RuleType.string().trim().max(11).optional())
  userPhone: string;

  @CreateApiPropertyDoc('客户性别')
  @Rule(RuleType.number().max(999).optional())
  userGenderType: number;

  @CreateApiPropertyDoc('预约时间')
  @Rule(RuleType.date().optional())
  preTime: Date;

  @CreateApiPropertyDoc('宠物类型')
  @Rule(RuleType.number().max(999).optional())
  petsType: number;

  @CreateApiPropertyDoc('服务类型')
  @Rule(RuleType.number().max(999).optional())
  serviceType: number;

  @CreateApiPropertyDoc('描述')
  @Rule(RuleType.string().trim().max(255).optional())
  description: string;
}

/**
 * 更新预约单参数
 */
export class ProgressDTO {
  @CreateApiPropertyDoc('预约单的id')
  @Rule(RuleType.string().trim().max(19).required())
  id: string;

  @CreateApiPropertyDoc('状态，(1:已预约, 2:服务中, 3:已完成, 4已取消)')
  @Rule(RuleType.number().max(999).required())
  status: number;
}
