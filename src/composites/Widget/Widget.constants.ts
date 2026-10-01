/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';
import type { PinMode, WidgetVisibility } from './Widget.type';

const DEFAULT_LAYOUT_STORAGE_KEY = 'widget-layout';

const DEFAULT_OPACITY = 0.92;

const DEFAULT_VISIBILITY: WidgetVisibility = 'context-only';

const MIGRATE_SHARE = { outer: 0.22, min: 0.12, max: 0.45 } as const;

const FALLBACK_FLOAT_SIZE = { width: 320, height: 280 } as const;

const PIN_NEXT: Record<PinMode, PinMode> = { off: 'top', top: 'with-app', 'with-app': 'off' };

const PIN_ICONS: Record<PinMode, IconName> = { off: 'pin-off', top: 'pin', 'with-app': 'link' };

export { DEFAULT_LAYOUT_STORAGE_KEY, DEFAULT_OPACITY, DEFAULT_VISIBILITY, FALLBACK_FLOAT_SIZE, MIGRATE_SHARE, PIN_ICONS, PIN_NEXT };
