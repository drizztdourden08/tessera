/* @layer renderer-components @kind component */
import { Spinner } from '../Spinner';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { ListboxStatusProps } from './listbox-view.type';

const ListboxStatus = (props: ListboxStatusProps) => {
  const { loading, empty, emptyText } = props;
  const { common } = useTesseraStrings();
  if (loading) {
    return (
      <div className="listbox-status">
        <Spinner size="sm" />
        <Span aria-hidden>{common.loading}</Span>
      </div>
    );
  }
  return empty ? <div className="listbox-status"><Span>{emptyText}</Span></div> : null;
};

export { ListboxStatus };
