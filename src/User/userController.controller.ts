import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';

@Controller('/usuarios')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() dataUser: CreateUserDTO) {
    await this.userRepository.save(dataUser);
    return dataUser;
  }

  @Get()
  async listUsuarios() {
    return this.userRepository.list();
  }
}
