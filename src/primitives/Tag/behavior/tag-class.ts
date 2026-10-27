/* @layer renderer-components @kind util */
import type { TagProps } from '../Tag.type';
import { tagLookClasses } from './tag-look-classes';

const tagClass = (props: TagProps): string => {
  const { selected, selectedTone, onRemove, pill, outlined, size, href, className } = props;
  return [
    'tag', ...tagLookClasses(props),
    pill === true && 'tag--pill',
    outlined === true && 'tag--outlined',
    size === 'lg' && 'tag--lg',
    href !== undefined && 'tag--link',
    selected !== undefined && 'tag--selectable',
    selected === true && 'tag--selected',
    selected === true && selectedTone === 'neutral' && 'tag--selected-neutral',
    onRemove !== undefined && 'tag--removable',
    className,
  ].filter(Boolean).join(' ');
};

export { tagClass };
