/* @layer renderer-components @kind util */
import type { TagProps } from '../Tag.type';
import { tagLookClasses } from './tag-look-classes';

const tagClass = (props: TagProps): string => {
  const { selected, onRemove, className } = props;
  return [
    'tag', ...tagLookClasses(props),
    selected !== undefined && 'tag--selectable',
    selected === true && 'tag--selected',
    onRemove !== undefined && 'tag--removable',
    className,
  ].filter(Boolean).join(' ');
};

export { tagClass };
