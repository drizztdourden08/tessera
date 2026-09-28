/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import type { DiffBracketProps } from './DiffBracket.type';
import '../../../theme/compact-record-view.css';

const DiffBracket = (props: DiffBracketProps) => {
  const { difference } = props;
  const { shown, source } = difference;

  return (
    <Text as="span" className="compact-record-view__diff" title={`live (${source}): ${shown.live}`}>
      {' '}[{shown.live}]
    </Text>
  );
};

export { DiffBracket };
