import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPO')
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(sub: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: sub } });
  }
}
