/* @layer renderer-components @kind util */
import type { TagProps } from '../Tag.type';
import { tagLookClasses } from './tag-look-classes';

const tagClass = (props: TagProps): string => {
  const { selected, onRemove, pill, href, className } = props;
  return [
    'tag', ...tagLookClasses(props),
    pill === true && 'tag--pill',
    href !== undefined && 'tag--link',
    selected !== undefined && 'tag--selectable',
    selected === true && 'tag--selected',
    onRemove !== undefined && 'tag--removable',
    className,
  ].filter(Boolean).join(' ');
};

export { tagClass };
