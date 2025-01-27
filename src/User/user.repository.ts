import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

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
    const possibleUser = this.users.find((userSave) => userSave.id === id);

    if (!possibleUser) {
      throw new Error('Usuario não existe');
    }
    Object.entries(dataOfUpdate).forEach(([key, val]) => {
      if (key === 'id') {
        return;
      }
      possibleUser[key] = val;
    });
    return possibleUser;
  }
}
