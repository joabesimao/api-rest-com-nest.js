import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './userController.controller';
import { EmailIsUnicValidator } from './validacao/email-unico.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailIsUnicValidator],
})
export class UserModule {}
