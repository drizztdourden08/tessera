/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { EmptyState } from '../../../primitives/EmptyState';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { Small } from '../../../primitives/text-elements';
import { groupStarts } from '../behavior/group-starts';
import { optionId } from '../behavior/option-id';
import type { CommandPaletteItem } from '../CommandPalette.type';
import { CommandPaletteRow } from './CommandPaletteRow';
import type { CommandPaletteListProps } from './CommandPaletteList.type';

const CommandPaletteList = <T extends CommandPaletteItem>(props: CommandPaletteListProps<T>) => {
  const { listId, listRef, groups, active, onActive, onSelect, label, empty } = props;
  const starts = groupStarts(groups);

  return (
    <ScrollArea ref={listRef} className="command-palette__list">
      <Box role="listbox" id={listId} aria-label={label}>
        {groups.map((group, position) => {
          if (group.items.length === 0) return null;
          const headingId = `${listId}-group-${position}`;
          return (
            <Box key={group.id} role="group" aria-labelledby={group.label == null ? undefined : headingId}>
              {group.label != null && <Small id={headingId} tone="muted" className="command-palette__heading">{group.label}</Small>}
              {group.items.map((item, offset) => {
                const index = (starts[position] ?? 0) + offset;
                return (
                  <CommandPaletteRow
                    key={item.id}
                    item={item}
                    index={index}
                    id={optionId(listId, index)}
                    active={index === active}
                    onHover={() => onActive(index)}
                    onSelect={() => onSelect(item)}
                  />
                );
              })}
            </Box>
          );
        })}
      </Box>
      {empty != null && <EmptyState className="command-palette__empty" message={empty} />}
    </ScrollArea>
  );
};

export { CommandPaletteList };
