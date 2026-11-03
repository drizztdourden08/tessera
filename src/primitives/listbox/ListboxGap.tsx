/* @layer renderer-components @kind component */
import type { GapStyle, ListboxGapProps } from './listbox-window.type';

const ListboxGap = (props: ListboxGapProps) => {
  const { rows, count } = props;
  const style: GapStyle = { '--listbox-gap-rows': String(rows) };
  return <div className="listbox-gap" aria-hidden style={style} data-listbox-count={count} />;
};

export { ListboxGap };
