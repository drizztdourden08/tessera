/* @layer renderer-components @kind data */
import { APP_ICONS } from './icons-app.constants';
import { STATUS_ICONS } from './icons-status.constants';
import { INTERFACE_ICONS } from './icons-ui.constants';

const ICONS = { ...APP_ICONS, ...INTERFACE_ICONS, ...STATUS_ICONS } as const;

export { ICONS };
