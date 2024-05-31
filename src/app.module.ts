import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAdminController } from './controllers/user/user.admin.controller';
import { UserService } from './modules/user/services/user/user.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth.service';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [AppController, UserAdminController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
