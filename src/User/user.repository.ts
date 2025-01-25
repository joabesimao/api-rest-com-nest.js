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
}
