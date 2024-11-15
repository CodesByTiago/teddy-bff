import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
