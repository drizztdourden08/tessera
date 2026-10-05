/* @layer renderer-components @kind component */
import { HighlightedText } from '../../../primitives/listbox/HighlightedText';
import { Span } from '../../../primitives/text-elements';
import type { MenuLabelProps } from './MenuLabel.type';

const MenuLabel = (props: MenuLabelProps) => {
  const { item, query, ask, asking = false } = props;
  const shown = query ? <HighlightedText text={item.label} query={query} /> : item.label;
  if (ask === undefined) return <Span className="dropdown__label">{shown}</Span>;
  return (
    <Span className="dropdown__label dropdown__label--ask">
      <Span aria-live="polite">{asking ? ask : shown}</Span>
      <Span className="dropdown__label-room" aria-hidden="true">{asking ? item.label : ask}</Span>
    </Span>
  );
};

export { MenuLabel };
