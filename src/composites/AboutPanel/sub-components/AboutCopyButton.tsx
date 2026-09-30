/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useCopied } from '../behavior/useCopied';
import { COLLECTING_LABEL, COPIED_LABEL } from '../AboutPanel.constants';
import type { AboutCopyButtonProps } from './AboutCopyButton.type';

const AboutCopyButton = (props: AboutCopyButtonProps) => {
  const { text, label, onCopy } = props;
  const { copied, handleCopy } = useCopied(text, onCopy);
  const shown = text === null ? COLLECTING_LABEL : label;

  return (
    <Button variant="secondary" className="about-panel__copy" onClick={() => void handleCopy()} disabled={text === null}>
      {copied ? COPIED_LABEL : shown}
    </Button>
  );
};

export { AboutCopyButton };
