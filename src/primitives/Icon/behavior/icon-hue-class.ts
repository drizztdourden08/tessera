/* @layer renderer-components @kind util */
import type { TagCategoryColor } from '../../Tag/Tag.type';
import { tagHueClass } from '../../tag-hue/tag-hue-class';

const iconHueClass = (hue: TagCategoryColor, className?: string): string => (
  ['icon--hue', tagHueClass(hue), className].filter(Boolean).join(' ')
);

export { iconHueClass };
