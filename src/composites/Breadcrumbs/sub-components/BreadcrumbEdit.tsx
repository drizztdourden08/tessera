/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PathInput } from '../../PathInput';
import { useFocusInside } from '../behavior/useFocusInside';
import type { BreadcrumbEditProps } from '../Breadcrumbs.type';

const BreadcrumbEdit = ({ initial, onSubmit, onCancel }: BreadcrumbEditProps) => {
  const { navigation } = useTesseraStrings();
  const [draft, setDraft] = useState<string | null>(initial);
  const frameRef = useRef<HTMLElement>(null);
  useFocusInside(frameRef);

  return (
    <Box
      ref={frameRef}
      className="breadcrumbs__edit"
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== 'Escape') return;
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Enter') onSubmit(draft ?? '');
        else onCancel();
      }}
    >
      <PathInput
        value={draft}
        onChange={setDraft}
        kind="any"
        copyable={false}
        aria-label={navigation.editPath}
        onBlur={(event) => {
          if (!frameRef.current?.contains(event.relatedTarget)) onCancel();
        }}
      />
    </Box>
  );
};

export { BreadcrumbEdit };
