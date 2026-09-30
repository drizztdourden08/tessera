/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useCopied } from '../behavior/useCopied';
import { COPIED_LABEL } from '../AboutPanel.constants';
import type { AboutCopyButtonProps } from './AboutCopyButton.type';

const AboutCopyButton = (props: AboutCopyButtonProps) => {
  const { text, label, onCopy } = props;
  const { copied, handleCopy } = useCopied(text, onCopy);

  return (
    <Button variant="secondary" className="about-panel__copy" onClick={() => void handleCopy()} loading={text === null}>
      {copied ? COPIED_LABEL : label}
    </Button>
  );
};

export { AboutCopyButton };
