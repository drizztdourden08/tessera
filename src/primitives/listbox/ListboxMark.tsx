/* @layer renderer-components @kind component */
import { Checkbox } from '../Checkbox';
import { Glyph } from '../Glyph';
import type { ListboxMarkProps } from './listbox-view.type';

const ignoreChange = () => undefined;

const ListboxMark = (props: ListboxMarkProps) => {
  const { multi, state } = props;
  if (!multi) {
    return <span className="listbox-option__mark">{state.selected && <Glyph name="check" size={14} />}</span>;
  }
  return (
    <span className="listbox-option__mark" inert>
      <Checkbox size="sm" checked={state.selected} disabled={state.disabled || state.locked} onChange={ignoreChange} />
    </span>
  );
};

export { ListboxMark };
