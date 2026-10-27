/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Tooltip } from '../../../primitives/Tooltip';
import { chordLabel } from '../behavior/chord-label';
import { ICON_SIZE } from '../MarkdownEditor.constants';
import type { MarkdownEditorActionButtonProps } from '../MarkdownEditor.type';

const MarkdownEditorActionButton = (props: MarkdownEditorActionButtonProps) => {
  const { spec, disabled, onAction } = props;
  const { markdownEditor } = useTesseraStrings();
  const name = markdownEditor[spec.id];
  const tip = spec.key ? markdownEditor.withChord(name, chordLabel(spec.key)) : name;
  return (
    <Tooltip content={tip} placement="bottom">
      <IconButton
        label={name}
        size="sm"
        disabled={disabled}
        aria-keyshortcuts={spec.key ? `Control+${spec.key} Meta+${spec.key}` : undefined}
        onClick={() => onAction(spec.id)}
      >
        <Icon name={spec.icon} size={ICON_SIZE} />
      </IconButton>
    </Tooltip>
  );
};

export { MarkdownEditorActionButton };
