/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Field } from '../../../primitives/Field';
import { FileInput } from '../../../primitives/FileInput';
import { Icon } from '../../../primitives/Icon';
import { SearchInput } from '../../../primitives/SearchInput';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ChoiceGrid } from '../../ChoiceGrid';
import { focusFirstCell } from '../behavior/focus-first-cell';
import { GRID_COLUMNS, UPLOAD_ACCEPT } from '../IconPicker.constants';
import type { IconPickerPanelProps } from './IconPickerPanel.type';

const IconPickerPanel = (props: IconPickerPanelProps) => {
  const { anchorRef, icons, selected, query, problem, allowUpload, onQuery, onPick, onUpload, onClose } = props;
  const { iconPicker } = useTesseraStrings();
  const gridRef = useRef<HTMLElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cells = icons.map((name) => ({ value: name, label: name, content: <Icon name={name} /> }));

  const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    focusFirstCell(gridRef.current);
  };

  return (
    <Anchored anchorRef={anchorRef} onDismiss={onClose} role="dialog" aria-label={iconPicker.dialog} className="icon-picker__popover">
      <Box surface="raised" className="icon-picker__panel">
        <SearchInput size="sm" autoFocus value={query} onChange={onQuery} placeholder={iconPicker.search} aria-label={iconPicker.search} onKeyDown={handleSearchKey} />
        <Box ref={gridRef} className="icon-picker__scroll">
          {cells.length === 0
            ? <Text tone="muted" className="icon-picker__empty">{iconPicker.empty}</Text>
            : <ChoiceGrid label={iconPicker.grid} role="listbox" value={selected} onChange={onPick} cells={cells} columns={GRID_COLUMNS} />}
        </Box>
        {allowUpload && (
          <Field width="full" error={problem ? iconPicker[problem] : undefined}>
            <Button size="sm" variant="secondary" fullWidth onClick={() => fileRef.current?.click()}>{iconPicker.upload}</Button>
            <FileInput ref={fileRef} accept={UPLOAD_ACCEPT} onFiles={onUpload} />
          </Field>
        )}
      </Box>
    </Anchored>
  );
};

export { IconPickerPanel };
