/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { IconButton } from '../../IconButton';
import { useCopy } from '../../TesseraProvider/behavior/useCopy';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { CopyCodeButtonProps } from './CopyCodeButton.type';

const CopyCodeButton = (props: CopyCodeButtonProps) => {
  const { code } = props;
  const { copied, copy } = useCopy();
  const { common, fields } = useTesseraStrings();

  return (
    <IconButton className="code-block__copy" variant="ghost" size="sm" label={copied ? common.copied : fields.copyCode} onClick={() => void copy(code)}>
      <Glyph name={copied ? 'check' : 'copy'} />
    </IconButton>
  );
};

export { CopyCodeButton };
