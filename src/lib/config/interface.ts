import { Configuration } from 'log4js';

export interface ICors {
  enable: boolean;
}

export interface IBodyParser {
  enable: boolean;
  limit: string;
}

export interface IValidation {
  enable: boolean;
  skipMissingProperties: boolean;
}

export interface ILog {
  enable: boolean;
  configuration: Configuration;
}

export interface IAuth {
  enable: boolean;
  headerTag: string;
  secret: string;
  expiresIn: string;
  decodedTag: string;
}

export interface IApp {
  port: number;
  setUpMsg: string;
  apiPrefix: IApiPrefix;
}

export interface IApiPrefix {
  enable: boolean;
  prefix: string;
}

export interface ISwagger {
  enable: boolean;
  title: string;
  description: string;
  schemas: string;
  version: string;
  email: string;
  path: string;
}

export interface IRequest {
  traceRequestDuration: boolean;
  cors: ICors;
  bodyParser: IBodyParser;
  validation: IValidation;
  auth: IAuth;
}

export interface IRootObject {
  app: IApp;
  logging: ILog;
  request: IRequest;
  response: IResponse;
  swagger: ISwagger;
}

export interface ISuccessField {
  enable: boolean;
  name: string;
}

export interface IStatusField {
  enable: boolean;
  name: string;
}

export interface ISuccess {
  defaultMessage: string;
  successField: ISuccessField;
  statusField: IStatusField;
}

export interface IFailure {
  defaultMessage: string;
  successField: ISuccessField;
  statusField: IStatusField;
}

export interface IResponse {
  success: ISuccess;
  failure: IFailure;
}
