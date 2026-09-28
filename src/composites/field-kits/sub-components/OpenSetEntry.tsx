/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { TextInput } from '../../../primitives/TextInput';
import { APPLY, PLACEHOLDER } from './OpenSetEntry.constants';
import type { OpenSetEntryProps } from './OpenSetEntry.type';

const OpenSetEntry = (props: OpenSetEntryProps) => {
  const { draft, label, disabled = false, onDraft, onCommit } = props;
  return (
    <Flex className="field-kit__open-set-entry" gap="xs" align="center">
      <TextInput
        className="field-kit__open-set-input"
        value={draft}
        placeholder={PLACEHOLDER}
        disabled={disabled}
        aria-label={`${label}: a value that is not listed`}
        onChange={(event) => onDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
          onCommit();
        }}
      />
      <Button size="sm" variant="secondary" disabled={disabled} onClick={onCommit}>
        {APPLY}
      </Button>
    </Flex>
  );
};

export { OpenSetEntry };
