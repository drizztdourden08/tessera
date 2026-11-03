/* @layer renderer-components @kind util */
import type { TagCategoryColor } from '../Tag/Tag.type';

const tagHueClass = (color: TagCategoryColor | undefined): string => (color === undefined ? 'tag-hue' : `tag-hue tag-hue--${color}`);

export { tagHueClass };
