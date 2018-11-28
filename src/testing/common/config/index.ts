import { configDevelopment } from './config.dev';
import { configProduction } from './config.prod';
import { error } from './errors';
import { commonSetting } from './setting';

const DEV = 'development';
let env = process.env.NODE_ENV || DEV;
env = env.toLowerCase();

const getConfig = () => {
  return env === DEV ? configDevelopment : configProduction;
};

// 将setting跟config合并
const config = Object.assign({}, getConfig(), commonSetting, error);

export default config;
