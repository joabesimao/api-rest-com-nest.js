import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUserDTO } from './dto/ListUser.dto';
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
      usuario: new ListUserDTO(userEntity.id, userEntity.nome),
      message: 'usuario criado com sucesso',
    };
  }

  @Get()
  async listUsuarios() {
    const list = await this.userRepository.list();
    const userList = list.map((user) => new ListUserDTO(user.id, user.nome));
    return userList;
  }
}
