import { UnifiedRoles } from 'src/common/enum';

export interface IToken {
  id: string;
  phoneNumber: string;
  role: UnifiedRoles;
  lastLoginAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  iat?: number;
  exp?: number;
}
