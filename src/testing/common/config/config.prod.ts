export const configProduction = {
  debug: false,

  // 环境配置
  host: 'xxx.com.cn',
  apiURL: 'http://xxx.com.cn:3000',

  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }
};
