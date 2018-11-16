export interface ICors {
  enable: boolean;
}

export interface IBodyParser {
  enable: boolean;
  limit: string;
}

export interface IValidation {
  enable: boolean;
}

export interface ILogRequest {
  enable: boolean;
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
  cors: ICors;
  bodyParser: IBodyParser;
  validation: IValidation;
  logRequest: ILogRequest;
  auth: IAuth;
}

export interface ISwagger {
  enable: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface IRootObject {
  app: IApp;
  swagger: ISwagger;
}
