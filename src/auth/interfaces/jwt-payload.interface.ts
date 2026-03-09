import { UserRole } from '../../users';

export interface JwtPayload {
  sub: string;
  phoneNumber: string;
  role: UserRole;
}