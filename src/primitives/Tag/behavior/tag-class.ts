/* @layer renderer-components @kind util */
import type { TagProps } from '../Tag.type';

const tagClass = (props: TagProps): string => {
  const { variant = 'normal', color = 'neutral', selected, onRemove, className } = props;
  return [
    'tag', `tag--${variant}`, `tag--${color}`,
    selected !== undefined && 'tag--selectable',
    selected === true && 'tag--selected',
    onRemove !== undefined && 'tag--removable',
    className,
  ].filter(Boolean).join(' ');
};

export { tagClass };
