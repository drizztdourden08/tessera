/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { ListboxNames } from './ListboxNames';
import type { ListboxCountProps } from './listbox-view.type';

const ListboxCount = <T,>(props: ListboxCountProps<T>) => {
  const { displays } = props;
  const { common } = useTesseraStrings();
  return (
    <Tooltip content={<ListboxNames displays={displays} />} placement="bottom" className="listbox-value">
      {common.selectedCount(displays.length)}
    </Tooltip>
  );
};

export { ListboxCount };
