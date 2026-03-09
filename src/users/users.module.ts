import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  // providers — то, что живёт внутри модуля
  providers: [UsersRepository, UsersService],
  // exports — то, что другие модули могут использовать (импортировав UsersModule)
  exports: [UsersService],
})
export class UsersModule {}