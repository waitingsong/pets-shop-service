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
  @Rule(RuleType.string().trim().max(10).optional())
  id?: string;

  @CreateApiPropertyDoc('筛选字段-名称')
  @Rule(RuleType.string().trim().max(50).optional())
  nameName?: string;

  @CreateApiPropertyDoc(
    '排序字段，以字段名加下划线组合，不能有特殊字符和不存在的字段。例如: name_ASC 或者 name_DESC'
  )
  @Rule(
    RuleType.string()
      .trim()
      .max(50)
      .regex(/^[a-zA-Z]*(_ASC|_DESC)$/)
      .optional()
  )
  sorter?: string;
}

/**
 * 获取单条预约单参数
 */
export class ShowDTO {
  @CreateApiPropertyDoc('预约单的id')
  @Rule(RuleType.string().trim().max(10).required())
  id: string;
}

/**
 * 删除预约单参数
 */
export class RemoveDTO {
  @CreateApiPropertyDoc('预约单id的数组')
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).min(1))
  ids: string[];
}

/**
 * 创建预约单参数
 */
export class CreateDTO {
  @CreateApiPropertyDoc('用户姓名')
  @Rule(RuleType.string().trim().max(50).required())
  userName: string;

  @CreateApiPropertyDoc('用户手机')
  @Rule(RuleType.string().trim().max(11).required())
  userPhone: string;

  @CreateApiPropertyDoc('用户性别')
  @Rule(RuleType.number().max(1))
  userGenderType: number;

  @CreateApiPropertyDoc('预约时间')
  @Rule(RuleType.date())
  preTime: Date;

  @CreateApiPropertyDoc('宠物类型')
  @Rule(RuleType.number().max(1).required())
  petsType: number;

  @CreateApiPropertyDoc('服务类型')
  @Rule(RuleType.number().max(1).required())
  serviceType: number;
}

/**
 * 更新预约单参数
 */
export class UpdateDTO {
  @CreateApiPropertyDoc('预约单的id')
  @Rule(RuleType.string().trim().max(10).required())
  id: string;

  @CreateApiPropertyDoc('用户姓名')
  @Rule(RuleType.string().trim().max(50).required())
  userName: string;

  @CreateApiPropertyDoc('用户手机')
  @Rule(RuleType.string().trim().max(11).required())
  userPhone: string;

  @CreateApiPropertyDoc('用户性别')
  @Rule(RuleType.number().max(1))
  userGenderType: number;

  @CreateApiPropertyDoc('预约时间')
  @Rule(RuleType.date())
  preTime: Date;

  @CreateApiPropertyDoc('宠物类型')
  @Rule(RuleType.number().max(1).required())
  petsType: number;

  @CreateApiPropertyDoc('服务类型')
  @Rule(RuleType.number().max(1).required())
  serviceType: number;
}

/**
 * 更新预约单参数
 */
export class ProgressDTO {
  @CreateApiPropertyDoc('预约单的id')
  @Rule(RuleType.string().trim().max(10).required())
  id: string;

  @CreateApiPropertyDoc('状态，(1:已预约, 2:服务中, 3:已完成, 4已取消)')
  @Rule(RuleType.number().max(1))
  status: number;
}
