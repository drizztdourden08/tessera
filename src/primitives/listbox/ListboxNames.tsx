/* @layer renderer-components @kind component */
import { Span } from '../text-elements';
import type { ListboxCountProps } from './listbox-view.type';

const ListboxNames = <T,>(props: ListboxCountProps<T>) => {
  const { displays } = props;
  return (
    <span className="listbox-value__names">
      {displays.map((display) => <Span key={display.key}>{display.label}</Span>)}
    </span>
  );
};

export { ListboxNames };
