import { UnifiedRoles } from 'src/common/enum';

export interface IToken {
  id: string;
  phoneNumber: string;
  role: UnifiedRoles;
}
