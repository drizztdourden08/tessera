/* @layer renderer-components @kind component */
import { Spinner } from '../Spinner';
import type { ListboxStatusProps } from './listbox-view.type';

const ListboxStatus = (props: ListboxStatusProps) => {
  const { loading, empty, emptyText } = props;
  if (loading) {
    return (
      <div className="listbox-status">
        <Spinner size="sm" />
        <span aria-hidden>Loading</span>
      </div>
    );
  }
  return empty ? <div className="listbox-status">{emptyText}</div> : null;
};

export { ListboxStatus };
