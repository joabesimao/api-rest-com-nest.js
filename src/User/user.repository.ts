import { Delete, Injectable, Param } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private findById(id: string) {
    const possibleUser = this.users.find((userSave) => userSave.id === id);
    if (!possibleUser) {
      throw new Error('Usuario não existe');
    }
    return possibleUser;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async existsWithEmail(email: string) {
    const possibleUser = this.users.find((a) => a.email === email);
    return possibleUser !== undefined;
  }

  async update(id: string, dataOfUpdate: Partial<UserEntity>) {
    const possibleUser = this.findById(id);
    Object.entries(dataOfUpdate).forEach(([key, val]) => {
      if (key === 'id') {
        return;
      }
      possibleUser[key] = val;
    });
    return possibleUser;
  }

  async removeUser(@Param('id') id: string) {
    const user = this.findById(id);
    this.users = this.users.filter((userSave) => userSave.id !== id);

    return user;
  }
}
