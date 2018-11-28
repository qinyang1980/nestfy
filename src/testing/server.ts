import { NestfyApp } from '../lib';
import { ApplicationModule } from './modules/app.module';

NestfyApp.bootstrap(ApplicationModule);
