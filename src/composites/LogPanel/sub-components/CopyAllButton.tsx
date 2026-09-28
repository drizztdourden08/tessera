/* @layer renderer-components @kind component */
import { useCallback, useState } from 'react';
import { Button, Glyph } from '../../../primitives';
import { COPIED_MS } from './CopyAllButton.constants';
import type { CopyAllButtonProps } from './CopyAllButton.type';

const CopyAllButton = (props: CopyAllButtonProps) => {
  const { copyText, disabled } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!('clipboard' in navigator)) return;
    navigator.clipboard.writeText(copyText()).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), COPIED_MS);
      },
      () => setCopied(false),
    );
  }, [copyText]);

  return (
    <Button
      variant="tertiary"
      size="sm"
      className="log-panel__copy"
      onClick={handleCopy}
      disabled={disabled}
      icon={<Glyph name={copied ? 'check' : 'copy'} />}
    >
      {copied ? 'Copied' : 'Copy all'}
    </Button>
  );
};

export { CopyAllButton };
