/* @layer renderer-components @kind logic */
import { tagHueClass } from '../../../primitives/tag-hue/tag-hue-class';
import type { TagCategoryColor } from '../../../primitives/Tag';
import type { RecordCardDensity } from '../RecordCard.type';

const recordCardClass = (density: RecordCardDensity, className: string | undefined, tint?: TagCategoryColor): string =>
  ['record-card', `record-card--${density}`, tint === undefined ? undefined : tagHueClass(tint), className].filter(Boolean).join(' ');

export { recordCardClass };
