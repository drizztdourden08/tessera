/* @layer renderer-components @kind constants */
import { createElement } from 'react';
import { HighlightedText } from '../../../primitives/listbox/HighlightedText';
import { Span } from '../../../primitives/text-elements';
import type { ListboxColumn } from '../../../primitives/listbox/listbox.type';
import type { CommandEntry } from '../CommandInput.type';

const commandColumn: ListboxColumn<CommandEntry> = {
  id: 'command',
  field: 'command',
  render: (_value, context) =>
    createElement(Span, { className: 'command-input__command' }, createElement(HighlightedText, { text: context.item.command, query: context.query.trim() })),
};

const aboutColumn: ListboxColumn<CommandEntry> = { id: 'description', field: 'description', tone: 'muted', width: 'fill' };

const COMMAND_COLUMNS: readonly ListboxColumn<CommandEntry>[] = [commandColumn, aboutColumn];

export { COMMAND_COLUMNS };
