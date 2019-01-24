import * as fs from 'fs';
import * as jsoncParser from 'jsonc-parser';
import * as path from 'path';
import { NESTFY } from '../constants';
import { IRootObject } from './interface';

const filePath = path.join(process.cwd(), `${NESTFY}.json`);
const config: IRootObject = jsoncParser.parse((fs.readFileSync(filePath, 'utf8').toString()));

export default config;
