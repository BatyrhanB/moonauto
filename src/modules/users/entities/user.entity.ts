import { Column, Entity, Index } from 'typeorm';
import { AbstractEntity } from '../../../common';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

@Entity('users')
@Index(['phoneNumber'])
@Index(['lastName', 'firstName', 'isDeleted'])
export class UserEntity extends AbstractEntity {
  @Column({ name: 'phone_number', type: 'varchar', length: 20, unique: true })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
    default: null,
  })
  email: string | null;

  @Column({ type: 'varchar', length: 255, select: false, nullable: true, default: null })
  password: string | null;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({
    name: 'middle_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
  })
  middleName: string | null;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @Column({ name: 'is_phone_verified', default: false })
  isPhoneVerified: boolean;

  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  lastLoginAt: Date | null;
}
