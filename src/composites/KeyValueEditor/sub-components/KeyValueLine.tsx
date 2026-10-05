/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Combobox } from '../../../primitives/Combobox';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { KeyValueRowProps } from '../KeyValueEditor.type';
import { KeyValueValue } from './KeyValueValue';

const KeyValueLine = ({ row, look, invalid, onKey, onValue, onRemove }: KeyValueRowProps) => {
  const { common, options } = useTesseraStrings();
  const keyLabel = look.keyLabel ?? options.keyName;
  const remove = common.removeNamed(row.key);
  return (
    <Box className="key-value-editor__row" role="listitem" data-invalid={invalid || undefined}>
      {look.keys?.length ? (
        <Combobox
          items={look.keys} value={row.key} onChange={(key) => onKey(row.id, key ?? '')} invalid={invalid} disabled={look.disabled}
          aria-label={keyLabel} className="key-value-editor__key"
        />
      ) : (
        <TextInput
          value={row.key} invalid={invalid} disabled={look.disabled} aria-label={keyLabel} className="key-value-editor__key"
          onChange={(event) => onKey(row.id, event.target.value)}
        />
      )}
      <KeyValueValue value={row.value} name={row.key} look={look} onChange={(value) => onValue(row.id, value)} />
      <IconButton size="sm" variant="ghost" tone="danger" label={remove} title={remove} disabled={look.disabled} onClick={() => onRemove(row.id)}>
        <Icon name="trash-2" />
      </IconButton>
    </Box>
  );
};

export { KeyValueLine };
