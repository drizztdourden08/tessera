/* @layer renderer-components @kind component */
import { Spinner } from '../Spinner';
import { Span } from '../text-elements';
import type { ListboxStatusProps } from './listbox-view.type';

const ListboxStatus = (props: ListboxStatusProps) => {
  const { loading, empty, emptyText } = props;
  if (loading) {
    return (
      <div className="listbox-status">
        <Spinner size="sm" />
        <Span aria-hidden>Loading</Span>
      </div>
    );
  }
  return empty ? <div className="listbox-status"><Span>{emptyText}</Span></div> : null;
};

export { ListboxStatus };
