/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { useFieldControl } from '../../primitives/Field/behavior/useFieldControl';
import { FieldControlBoundary } from '../../primitives/FieldControlBoundary';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useKeyValueRows } from './behavior/useKeyValueRows';
import type { KeyValueEditorProps } from './KeyValueEditor.type';
import { KeyValueAdd } from './sub-components/KeyValueAdd';
import { KeyValueLine } from './sub-components/KeyValueLine';
import './KeyValueEditor.css';

const KeyValueEditor = (props: KeyValueEditorProps) => {
  const { keys, addPlaceholder, empty, disabled, className } = props;
  const { options } = useTesseraStrings();
  const problemId = useId();
  const control = useFieldControl();
  const state = useKeyValueRows(props);
  const message = state.problem.message;
  return (
    <Box
      className={['key-value-editor', className].filter(Boolean).join(' ')}
      role="group"
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-label'] ? undefined : control.labelId}
      aria-describedby={message ? problemId : undefined}
    >
      <FieldControlBoundary>
        <Box className="key-value-editor__rows" role="list">
          {state.rows.map((row) => (
            <KeyValueLine
              key={row.id} row={row} look={props} invalid={state.problem.rows.has(row.id)}
              onKey={state.setKey} onValue={state.setValue} onRemove={state.remove}
            />
          ))}
        </Box>
        {state.rows.length === 0 && <Text variant="caption" tone="dim">{empty ?? options.noEntries}</Text>}
        {message && <Text id={problemId} variant="caption" tone="danger" role="alert">{message}</Text>}
        <KeyValueAdd keys={keys} used={state.rows.map((row) => row.key.trim())} placeholder={addPlaceholder} disabled={disabled} onAdd={state.add} />
      </FieldControlBoundary>
    </Box>
  );
};

export { KeyValueEditor };
