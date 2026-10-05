/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { HighlightedText } from '../../../primitives/listbox/HighlightedText';
import { ListboxPanel } from '../../../primitives/listbox/ListboxPanel';
import { Span } from '../../../primitives/text-elements';
import type { CommandSuggestionsProps } from '../CommandInput.type';

const keepFocus = (event: MouseEvent) => event.preventDefault();

const CommandSuggestions = (props: CommandSuggestionsProps) => {
  const { suggest, query, size, label, onPick } = props;
  if (!suggest.open) return null;
  return (
    <ListboxPanel drop={suggest.drop} invalid={false} size={size} className="command-input__suggestions">
      <Box role="listbox" id={suggest.listId} className="listbox command-input__list" aria-label={label}>
        {suggest.hits.map((entry, index) => (
          <Box
            key={entry.command}
            id={suggest.optionId(index)}
            role="option"
            className="listbox-option command-input__option"
            aria-selected={index === suggest.active}
            data-active={index === suggest.active || undefined}
            onMouseDown={keepFocus}
            onMouseMove={() => { if (index !== suggest.active) suggest.point(index); }}
            onClick={() => onPick(entry)}
          >
            <Span className="listbox-cell command-input__command"><HighlightedText text={entry.command} query={query.trim()} /></Span>
            <Span className="listbox-cell command-input__about">{entry.description ?? ''}</Span>
          </Box>
        ))}
      </Box>
    </ListboxPanel>
  );
};

export { CommandSuggestions };
