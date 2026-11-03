/* @layer renderer-components @kind util */
import type { TagProps } from '../Tag.type';
import { tagLookClasses } from './tag-look-classes';

const tagClass = (props: TagProps): string => {
  const { selected, selectedTone, onRemove, pill, outlined, fill, edge, size, reason, href, onClick, className } = props;
  const flags: Readonly<Record<string, boolean>> = {
    'tag--pill': pill === true,
    'tag--outlined': outlined === true,
    'tag--fill-solid': fill === 'solid',
    'tag--fill-tint': fill === 'tint',
    'tag--edge-dashed': edge === 'dashed',
    'tag--lg': size === 'lg',
    'tag--reasoned': reason !== undefined,
    'tag--link': href !== undefined,
    'tag--clickable': href === undefined && onClick !== undefined,
    'tag--selectable': selected !== undefined,
    'tag--selected': selected === true,
    'tag--selected-neutral': selected === true && selectedTone === 'neutral',
    'tag--removable': onRemove !== undefined,
  };
  return [
    'tag', ...tagLookClasses(props),
    ...Object.keys(flags).filter((name) => flags[name]),
    className,
  ].filter(Boolean).join(' ');
};

export { tagClass };
