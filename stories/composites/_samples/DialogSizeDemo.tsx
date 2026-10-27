/* @layer stories @kind component */
import { useState } from 'react';
import { Dialog, Markdown } from '../../../src/composites';
import type { DialogSize } from '../../../src/composites';
import { Box, Button, Paragraph } from '../../../src/primitives';
import { LONG_PARAGRAPHS, SHORT_MESSAGE, WIDE_README } from './dialog-sizing.constants';

type DialogSizeKind = 'short' | 'long' | 'wide';

interface DialogSizeDemoProps {
  kind: DialogSizeKind;
  size: DialogSize;
  openLabel: string;
  title: string;
}

const bodyOf = (kind: DialogSizeKind) => {
  if (kind === 'long') return LONG_PARAGRAPHS.map((text) => <Paragraph key={text}>{text}</Paragraph>);
  if (kind === 'wide') return <Markdown source={WIDE_README} size="sm" headingOffset={2} hideTitle />;
  return null;
};

const DialogSizeDemo = (props: DialogSizeDemoProps) => {
  const { kind, size, openLabel, title } = props;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Box className="story-row">
      <Button variant="secondary" onClick={() => setOpen(true)}>{openLabel}</Button>
      <Dialog open={open} title={title} message={kind === 'short' ? SHORT_MESSAGE : ''} size={size} confirmLabel="Close" hideCancel onConfirm={close} onCancel={close}>
        {bodyOf(kind)}
      </Dialog>
    </Box>
  );
};

export { DialogSizeDemo };
