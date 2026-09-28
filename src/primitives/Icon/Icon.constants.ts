/* @layer renderer-components @kind data */
import { APP_ICONS } from '../icon-sets/app.constants';
import { STATUS_ICONS } from '../icon-sets/status.constants';
import { INTERFACE_ICONS } from '../icon-sets/interface.constants';

const ICONS = { ...APP_ICONS, ...INTERFACE_ICONS, ...STATUS_ICONS } as const;

export { ICONS };
