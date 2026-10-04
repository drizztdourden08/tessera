/* @layer renderer-components @kind component */
import { CopyButton } from '../../../composites/CopyButton';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { PathFieldToolsProps } from '../PathField.type';

const PathFieldTools = (props: PathFieldToolsProps) => {
  const { value, kind, editable, disabled, copyable, onClear, onReveal } = props;
  const { paths } = useTesseraStrings();
  const reveal = kind === 'folder' ? paths.revealFolder : paths.revealFile;
  return (
    <>
      {value && copyable && <CopyButton text={value} label={paths.copy} size="sm" variant="ghost" disabled={disabled} />}
      {value && onReveal && (
        <IconButton size="sm" variant="ghost" label={reveal} title={reveal} disabled={disabled} onClick={() => onReveal(value)}>
          <Icon name="folder-open" />
        </IconButton>
      )}
      {value && editable && (
        <IconButton size="sm" variant="ghost" label={paths.clear} title={paths.clear} disabled={disabled} onClick={onClear}>
          <Icon name="x" />
        </IconButton>
      )}
    </>
  );
};

export { PathFieldTools };
