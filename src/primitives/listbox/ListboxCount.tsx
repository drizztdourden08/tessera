/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import { ListboxNames } from './ListboxNames';
import type { ListboxCountProps } from './listbox-view.type';

const ListboxCount = <T,>(props: ListboxCountProps<T>) => {
  const { displays } = props;
  return (
    <Tooltip content={<ListboxNames displays={displays} />} placement="bottom" className="listbox-value">
      {`${displays.length} selected`}
    </Tooltip>
  );
};

export { ListboxCount };
