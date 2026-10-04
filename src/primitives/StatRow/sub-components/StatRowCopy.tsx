/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { IconButton } from '../../IconButton';
import { useCopy } from '../../TesseraProvider/behavior/useCopy';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { StatRowCopyProps } from './StatRowCopy.type';

const StatRowCopy = (props: StatRowCopyProps) => {
  const { text, name } = props;
  const { copied, copy } = useCopy();
  const { common } = useTesseraStrings();
  const label = copied ? common.copied : common.copyNamed(name);

  return (
    <IconButton className="stat-row__copy" variant="ghost" size="xs" label={label} title={label} onClick={() => void copy(text)}>
      <Glyph name={copied ? 'check' : 'copy'} />
    </IconButton>
  );
};

export { StatRowCopy };
