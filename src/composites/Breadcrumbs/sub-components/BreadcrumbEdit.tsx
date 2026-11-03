/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PathInput } from '../../PathInput';
import { useFocusInside } from '../behavior/useFocusInside';
import type { BreadcrumbEditProps } from '../Breadcrumbs.type';

const BreadcrumbEdit = ({ initial, onSubmit, onCancel, validate }: BreadcrumbEditProps) => {
  const { navigation } = useTesseraStrings();
  const [draft, setDraft] = useState<string | null>(initial);
  const frameRef = useRef<HTMLElement>(null);
  const problemId = useId();
  const problem = draft === initial ? null : (validate?.(draft ?? '') ?? null);
  useFocusInside(frameRef);

  return (
    <Box
      ref={frameRef}
      className="breadcrumbs__edit"
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== 'Escape') return;
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Escape') onCancel();
        else if (problem === null) onSubmit(draft ?? '');
      }}
    >
      <PathInput
        value={draft}
        onChange={setDraft}
        kind="any"
        copyable={false}
        aria-label={navigation.editPath}
        aria-describedby={problem === null ? undefined : problemId}
        invalid={problem !== null}
        onBlur={(event) => {
          if (!frameRef.current?.contains(event.relatedTarget)) onCancel();
        }}
      />
      {problem !== null && <Text id={problemId} variant="caption" tone="danger" role="alert" className="breadcrumbs__problem">{problem}</Text>}
    </Box>
  );
};

export { BreadcrumbEdit };
