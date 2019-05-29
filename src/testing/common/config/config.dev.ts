export const configDevelopment = {
  debug: true,

  // 环境配置
  host: 'localhost',
  apiURL: 'http://localhost:3000',

  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
};
