/* @layer renderer-components @kind component */
import { CopyButton } from '../../CopyButton';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PathInputToolsProps } from '../PathInput.type';

const PathInputTools = (props: PathInputToolsProps) => {
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

export { PathInputTools };
