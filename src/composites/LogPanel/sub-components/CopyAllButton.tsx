/* @layer renderer-components @kind component */
import { Button, Glyph } from '../../../primitives';
import { useCopy } from '../../../primitives/TesseraProvider/behavior/useCopy';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { CopyAllButtonProps } from './CopyAllButton.type';

const CopyAllButton = (props: CopyAllButtonProps) => {
  const { copyText, disabled } = props;
  const { copied, copy } = useCopy();
  const { common, panels } = useTesseraStrings();

  return (
    <Button
      variant="tertiary"
      size="sm"
      className="log-panel__copy"
      onClick={() => void copy(copyText())}
      disabled={disabled}
      icon={<Glyph name={copied ? 'check' : 'copy'} />}
    >
      {copied ? common.copied : panels.copyAll}
    </Button>
  );
};

export { CopyAllButton };
