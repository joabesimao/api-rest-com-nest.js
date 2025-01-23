import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [] as any[];

  async save(user: any) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }
}
