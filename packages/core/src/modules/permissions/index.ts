import {
  CrudAction,
  ProtectedResource,
} from 'src/modules/permissions/constants';
import { ResourceMap } from 'src/modules/permissions/types';
import { hasPermission } from 'src/modules/permissions/service';

export type { CrudAction, ResourceMap };
export { hasPermission, ProtectedResource };
