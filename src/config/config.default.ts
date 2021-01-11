import { EggAppInfo } from 'egg';
import { ConnectionOptions } from 'typeorm';

import { DefaultConfig } from './config.types';

export default (appInfo: EggAppInfo): DefaultConfig => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602294995416_4568';

  // add your config here
  config.middleware = ['jwtAuth'];

  // 默认管理员
  config.admin = {
    username: 'admin',
    password: 'admin',
  };

  config.security = {
    csrf: false,
  };

  // 数据库配置
  config.orm = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_HOST || 3306,
    username: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || undefined,
    synchronize: false,
    logging: true,
    timezone: '+08:00',
  } as ConnectionOptions;

  // redis配置
  config.redis = {
    client: {
      port: +process.env.REDIS_PORT || 6379, // Redis port
      host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD || '',
      db: +process.env.REDIS_DB || 0,
    },
  };

  // jwt配置
  config.jwt = {
    enable: true,
    client: {
      secret: '123456', // 默认密钥，生产环境一定要更改
    },
    // rule https://github.com/eggjs/egg-path-matching
    ignore: ['/auth/login', '/ping', '/swagger-u*'],
  };

  // jwt token 校验中间件(需配合jwt使用, ignore的配置与jwt一致)
  config.jwtAuth = {
    ignore: config.jwt.ignore,
    redisScope: 'admin', // redis的作用域前缀
    accessTokenExpiresIn: 60 * 60 * 24 * 3, // 签名过期时间也可写
  };

  config.swagger = {
    title: 'service-mw2',
    description: 'service-mw2 模版工程的接口定义',
    version: '1.0.0',
    termsOfService: 'https://github.com/fsd-nodejs/service-mw2',
    contact: {
      name: 'tkvern',
      url: 'https://github.com/tkvern',
      email: 'verncake@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/midwayjs/midway/blob/serverless/LICENSE',
    },
  };

  return config;
};
