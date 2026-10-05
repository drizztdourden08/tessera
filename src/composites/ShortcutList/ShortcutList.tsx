/* @layer renderer-components @kind component */
import { Fragment, useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { useNarrowList } from './behavior/useNarrowList';
import { ShortcutListRow } from './sub-components/ShortcutListRow';
import type { ShortcutListGroup, ShortcutListProps } from './ShortcutList.type';
import './ShortcutList.css';

const ShortcutList = (props: ShortcutListProps) => {
  const { size = 'xs', label, className } = props;
  const groups: readonly ShortcutListGroup[] = props.groups ?? [{ items: props.items }];
  const ref = useRef<HTMLDivElement>(null);
  const narrow = useNarrowList(ref);
  return (
    <Box
      ref={ref}
      className={['shortcut-list', `shortcut-list--${size}`, narrow && 'shortcut-list--narrow', className].filter(Boolean).join(' ')}
      role="group"
      aria-label={label}
    >
      <Box className="shortcut-list__grid">
        {groups.map((group, index) => (
          <Fragment key={group.label ?? index}>
            {group.label && <Text as="p" variant="overline" className="shortcut-list__heading">{group.label}</Text>}
            <Box as="dl" className="shortcut-list__group" aria-label={group.label}>
              {group.items.map((item, at) => <ShortcutListRow key={`${at}:${item.description}`} item={item} size={size} />)}
            </Box>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export { ShortcutList };
