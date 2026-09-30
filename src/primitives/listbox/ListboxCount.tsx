/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import type { ListboxCountProps } from './listbox-view.type';

const ListboxCount = <T,>(props: ListboxCountProps<T>) => {
  const { displays } = props;
  const names = (
    <span className="listbox-value__names">
      {displays.map((display) => <span key={display.key}>{display.label}</span>)}
    </span>
  );
  return (
    <Tooltip content={names} placement="bottom" className="listbox-value">
      {`${displays.length} selected`}
    </Tooltip>
  );
};

export { ListboxCount };
