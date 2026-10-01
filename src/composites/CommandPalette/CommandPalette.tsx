/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { emptyMessage } from './behavior/empty-message';
import { optionId } from './behavior/option-id';
import { paletteClass } from './behavior/palette-class';
import { useCommandPalette } from './behavior/useCommandPalette';
import { CommandPaletteInput } from './sub-components/CommandPaletteInput';
import { CommandPaletteList } from './sub-components/CommandPaletteList';
import type { CommandPaletteItem, CommandPaletteProps } from './CommandPalette.type';
import './CommandPalette.css';

const CommandPalette = <T extends CommandPaletteItem>(props: CommandPaletteProps<T>) => {
  const { open, onClose, query, onQueryChange, groups, onSelect, placeholder: placeholderProp, emptyText, label: labelProp } = props;
  const { common, navigation } = useTesseraStrings();
  const placeholder = placeholderProp ?? navigation.commandPlaceholder;
  const label = labelProp ?? common.search;
  const { items, active, setActive, inputRef, listRef, handleKeyDown } = useCommandPalette(props);
  const listId = useId();

  return (
    <>
      {open && <Box className="command-palette-scrim" onClick={onClose} />}
      <Box
        className={paletteClass(open, props.className ?? '')}
        role="dialog"
        aria-label={label}
        aria-hidden={!open}
        inert={!open}
      >
        <Box as="span" className="command-palette__edge" aria-hidden />
        <CommandPaletteInput
          inputRef={inputRef}
          value={query}
          onChange={onQueryChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          listId={listId}
          activeId={optionId(listId, active)}
          count={items.length}
        />
        <Box className="command-palette__body">
          <CommandPaletteList
            listId={listId}
            listRef={listRef}
            groups={groups}
            active={active}
            onActive={setActive}
            onSelect={onSelect}
            label={label}
            empty={emptyMessage(query, items.length, emptyText, navigation)}
          />
        </Box>
      </Box>
    </>
  );
};

export { CommandPalette };
