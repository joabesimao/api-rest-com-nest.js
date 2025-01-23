import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './userController.controller';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
