/* @layer renderer-components @kind component */
import { QUOTE_MARK_PATHS, QUOTE_MARK_TURN, QUOTE_MARK_VIEWBOX } from '../Quote.constants';
import type { QuoteMarkProps } from '../Quote.type';

const QuoteMark = (props: QuoteMarkProps) => {
  const { side } = props;
  return (
    <svg className={`quote__mark quote__mark--${side}`} viewBox={QUOTE_MARK_VIEWBOX} fill="currentColor" aria-hidden focusable="false">
      <g transform={side === 'open' ? QUOTE_MARK_TURN : undefined}>
        {QUOTE_MARK_PATHS.map((d) => <path key={d} d={d} />)}
      </g>
    </svg>
  );
};

export { QuoteMark };
