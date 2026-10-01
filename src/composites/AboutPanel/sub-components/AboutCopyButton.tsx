/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useCopy } from '../../../primitives/TesseraProvider/behavior/useCopy';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { AboutCopyButtonProps } from './AboutCopyButton.type';

const AboutCopyButton = (props: AboutCopyButtonProps) => {
  const { text, label } = props;
  const { copied, copy } = useCopy();
  const { common, panels } = useTesseraStrings();

  return (
    <Button variant="secondary" className="about-panel__copy" onClick={() => void (text !== null && copy(text))} loading={text === null}>
      {copied ? common.copied : label ?? panels.copyDebugInfo}
    </Button>
  );
};

export { AboutCopyButton };
