import { NestfyApp } from '../nestfy';
import { ApplicationModule } from './modules/app.module';

NestfyApp.bootstrap(ApplicationModule);
