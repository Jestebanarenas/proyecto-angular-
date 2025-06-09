import { Role } from './role.model';

export class Permission {
  id?: number;
  url?: string;
  method?: string;
  roles?: Role[]; // Relación N a N con Role
}
