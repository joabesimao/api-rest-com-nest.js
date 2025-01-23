import { Module } from '@nestjs/common';
import { ProductModule } from './Product/product.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
