import { UserRole } from '../../modules/users';

export interface JwtPayload {
  sub: string;
  phoneNumber: string;
  role: UserRole;
}