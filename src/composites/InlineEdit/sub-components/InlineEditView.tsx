/* @layer renderer-components @kind component */
import { guardCellControl } from '../../../primitives/dom/guard-cell-control';
import { drawnValue } from '../behavior/drawn-value';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { EDIT_KEY, PEN_SIZE } from '../InlineEdit.constants';
import type { InlineEditViewProps } from '../InlineEdit.type';
import './InlineEditView.css';

const InlineEditView = (props: InlineEditViewProps) => {
  const { name, label, value, placeholder, disabled, multiline, renderValue, look, buttonRef, className, onStart } = props;
  const { inlineEdit } = useTesseraStrings();
  const empty = value === '';
  const shown = empty ? (placeholder ?? '') : value;
  const drawn = drawnValue(value, renderValue);
  const classes = ['inline-edit__view', multiline && 'inline-edit__view--multiline', look === 'link' && 'inline-edit__view--link', className].filter(Boolean).join(' ');
  return (
    <Pressable
      ref={buttonRef}
      className={classes}
      disabled={disabled}
      aria-label={label === undefined ? inlineEdit.edit(name) : inlineEdit.editNamed(label, shown)}
      aria-keyshortcuts={EDIT_KEY}
      onClick={guardCellControl(onStart)}
      onKeyDown={(event) => {
        if (event.key !== EDIT_KEY) return;
        event.preventDefault();
        onStart();
      }}
    >
      <Span tone={empty ? 'muted' : undefined} className={drawn === undefined ? 'inline-edit__text' : 'inline-edit__text inline-edit__text--drawn'}>{drawn ?? shown}</Span>
      {!disabled && <Icon name="pencil" size={PEN_SIZE} className="inline-edit__pen" />}
    </Pressable>
  );
};

export { InlineEditView };
