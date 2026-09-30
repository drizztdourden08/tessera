/* @layer renderer-components @kind util */
import type { TagProps } from '../Tag.type';

const tagClass = (props: TagProps): string => {
  const { variant = 'normal', color = 'neutral', selected, onRemove, className } = props;
  return [
    'tag-chip', `tag-chip--${variant}`, `tag-chip--${color}`,
    selected !== undefined && 'tag-chip--selectable',
    selected === true && 'tag-chip--selected',
    onRemove !== undefined && 'tag-chip--removable',
    className,
  ].filter(Boolean).join(' ');
};

export { tagClass };
