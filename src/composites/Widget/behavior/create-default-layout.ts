/* @layer renderer-components @kind logic */
import { MAIN_NODE } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';

const createDefaultLayout = (): WidgetLayout => ({ v: 2, dock: MAIN_NODE, floating: [], popped: [], frame: {} });

export { createDefaultLayout };
