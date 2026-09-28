/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Button } from '../../../primitives/Button';
import { FieldControlBoundary } from '../../../primitives/Field';
import { Flex } from '../../../primitives/Flex';
import { committedValue } from '../committedValue';
import { TOGGLE } from './OpenSetControl.constants';
import { OpenSetEntry } from './OpenSetEntry';
import type { OpenSetControlProps } from './OpenSetControl.type';

const OpenSetControl = (props: OpenSetControlProps) => {
  const { current, label, onSubmit, disabled = false, children } = props;
  const [draft, setDraft] = useState<string | null>(null);

  const commit = () => {
    const next = committedValue(draft ?? '', current);
    setDraft(null);
    if (next !== undefined) onSubmit(next);
  };

  return (
    <Flex className="field-kit__open-set" gap="xs" align="center" wrap>
      {children}
      <Button
        size="sm"
        variant="tertiary"
        disabled={disabled}
        aria-expanded={draft !== null}
        title={`${label}: use a value that is not listed`}
        onClick={() => setDraft(draft === null ? current : null)}
      >
        {TOGGLE}
      </Button>
      {draft !== null && (
        <FieldControlBoundary>
          <OpenSetEntry
            draft={draft}
            label={label}
            disabled={disabled}
            onDraft={setDraft}
            onCommit={commit}
          />
        </FieldControlBoundary>
      )}
    </Flex>
  );
};

export { OpenSetControl };
