/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SearchInput } from '../../../primitives/SearchInput';
import { Small } from '../../../primitives/text-elements';
import type { CommandPaletteInputProps } from './CommandPaletteInput.type';

const CommandPaletteInput = (props: CommandPaletteInputProps) => {
  const { inputRef, value, onChange, onKeyDown, placeholder, listId, activeId, count } = props;

  return (
    <Box className="command-palette__input-row">
      <SearchInput
        ref={inputRef}
        className="command-palette__input"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-autocomplete="list"
      />
      {value && <Small tone="muted" className="command-palette__count" aria-live="polite">{count}</Small>}
    </Box>
  );
};

export { CommandPaletteInput };
