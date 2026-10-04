/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../Box';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { FieldControlBoundary } from '../FieldControlBoundary';
import { Checkbox } from '../Checkbox';
import { ScrollArea } from '../ScrollArea';
import { SearchInput } from '../SearchInput';
import { Tag } from '../Tag';
import { Text } from '../Text';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { toggleIn } from './behavior/toggle-in';
import type { SetPickerProps } from './SetPicker.type';
import './SetPicker.css';

const SetPicker = (props: SetPickerProps) => {
  const { options, value, onChange, placeholder, disabled, className } = props;
  const { options: words, common } = useTesseraStrings();
  const [query, setQuery] = useState('');
  const control = useFieldControl();
  const shown = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));
  const set = (option: string, on: boolean) => onChange(toggleIn(options, value, option, on));
  return (
    <Box className={['set-picker', className].filter(Boolean).join(' ')} role="group" aria-label={props['aria-label']} aria-labelledby={props['aria-label'] ? undefined : control.labelId}>
      <FieldControlBoundary>
        {value.length > 0 && (
          <Box className="set-picker__chosen" aria-label={words.chosen} role="list">
            {value.map((option) => (
              <Box key={option} role="listitem" as="span">
                <Tag onRemove={disabled ? undefined : () => set(option, false)} name={option} disabled={disabled}>{option}</Tag>
              </Box>
            ))}
          </Box>
        )}
        <SearchInput value={query} onChange={setQuery} placeholder={placeholder ?? words.searchItems(options.length)} aria-label={placeholder ?? words.searchItems(options.length)} disabled={disabled} />
        <ScrollArea className="set-picker__list" scrollbar="slim">
          {shown.map((option) => (
            <Checkbox key={option} checked={value.includes(option)} onChange={(on) => set(option, on)} label={option} disabled={disabled} />
          ))}
          {shown.length === 0 && <Text variant="caption" tone="dim">{query ? words.noMatch : common.nothingToShow}</Text>}
        </ScrollArea>
      </FieldControlBoundary>
    </Box>
  );
};

export { SetPicker };
