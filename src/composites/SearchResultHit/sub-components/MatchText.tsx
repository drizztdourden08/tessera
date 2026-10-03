/* @layer renderer-components @kind component */
import { Mark, Span } from '../../../primitives/text-elements';
import { splitMatch } from '../behavior/split-match';
import type { MatchTextProps } from './MatchText.type';

const MatchText = (props: MatchTextProps) => {
  const { text, query, className } = props;
  return (
    <Span className={className}>
      {splitMatch(text, query).map((part, index) => (part.match
        ? <Mark key={index} className="search-result-hit__match">{part.text}</Mark>
        : part.text))}
    </Span>
  );
};

export { MatchText };
