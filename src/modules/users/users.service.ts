import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByPhoneNumber(phoneNumber: string): Promise<UserEntity | null> {
    return this.usersRepository.findByPhoneNumber(phoneNumber);
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findById(id);
  }

  createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}