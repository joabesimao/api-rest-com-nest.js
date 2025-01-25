import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Controller('/usuarios')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() dataUser: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dataUser.email;
    userEntity.senha = dataUser.senha;
    userEntity.nome = dataUser.nome;
    userEntity.id = uuid();
    await this.userRepository.save(userEntity);
    return {
      id: userEntity.id,
      message: 'usuario criado com sucesso!',
    };
  }

  @Get()
  async listUsuarios() {
    return this.userRepository.list();
  }
}
