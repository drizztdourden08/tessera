/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { OpenSetEntryProps } from './OpenSetEntry.type';

const OpenSetEntry = (props: OpenSetEntryProps) => {
  const { draft, label, disabled = false, onDraft, onCommit } = props;
  const { records } = useTesseraStrings();
  return (
    <Flex className="field-kit__open-set-entry" gap="xs" align="center">
      <TextInput
        className="field-kit__open-set-input"
        value={draft}
        placeholder={records.otherValuePlaceholder}
        disabled={disabled}
        aria-label={records.otherValueLabel(label)}
        onChange={(event) => onDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
          onCommit();
        }}
      />
      <Button size="sm" variant="secondary" disabled={disabled} onClick={onCommit}>
        {records.setValue}
      </Button>
    </Flex>
  );
};

export { OpenSetEntry };
