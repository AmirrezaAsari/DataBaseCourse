import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAdminController } from './controllers/user/user.admin.controller';
import { UserService } from './modules/user/services/user/user.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserAdminController],
  providers: [AppService, UserService],
})
export class AppModule {}
