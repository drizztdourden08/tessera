/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { PathIcon } from '../../../primitives/PathIcon';
import { Small } from '../../../primitives/text-elements';
import { TextInput } from '../../../primitives/TextInput';
import { SEARCH_ICON_PATHS } from '../../SearchSpark';
import type { CommandPaletteInputProps } from './CommandPaletteInput.type';

const CommandPaletteInput = (props: CommandPaletteInputProps) => {
  const { inputRef, value, onChange, onKeyDown, placeholder, listId, activeId, count } = props;

  return (
    <Box className="command-palette__input-row">
      <PathIcon paths={SEARCH_ICON_PATHS} size={16} className="command-palette__input-icon" aria-hidden />
      <TextInput
        ref={inputRef}
        className="command-palette__input"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
