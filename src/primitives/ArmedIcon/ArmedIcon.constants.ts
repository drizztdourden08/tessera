/* @layer renderer-components @kind data */
import type { ArmedIconDrawing, ArmedIconName, ArmedIconPart } from './ArmedIcon.type';

const ARMED_ICON_BOX = '0 0 24 24';

const ARMED_ICON_STROKE = 2;

const ARMED_ICON_THIN_STROKE = 1.25;

const DISC = 'M3 15.5a9 3 0 1 0 18 0a9 3 0 1 0-18 0';

const PLATFORM: ArmedIconPart = { part: 'platform', d: [DISC, 'M3 15.5V19a9 3 0 0 0 18 0v-3.5'] };

const RIPPLE: ArmedIconPart = { part: 'ripple', d: [DISC], thin: true, armedOnly: true };

const STREAKS: ArmedIconPart = { part: 'streaks', d: ['M5 7.5v3.5', 'M19 7.5v3.5'], thin: true };

const ARMED_ICONS: Readonly<Record<ArmedIconName, ArmedIconDrawing>> = {
  'load-state': [PLATFORM, STREAKS, { part: 'arrow', d: ['M12 15.5V2.5', 'M8 6.5l4-4 4 4'] }],
  'save-state': [RIPPLE, PLATFORM, STREAKS, { part: 'arrow', d: ['M12 1.5v12', 'M8 9.5l4 4 4-4'] }],
  'trash-2': [
    { part: 'can', d: ['M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M10 11v6', 'M14 11v6'] },
    { part: 'lid', d: ['M3 6h18', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'] },
  ],
};

export { ARMED_ICON_BOX, ARMED_ICON_STROKE, ARMED_ICON_THIN_STROKE, ARMED_ICONS };
