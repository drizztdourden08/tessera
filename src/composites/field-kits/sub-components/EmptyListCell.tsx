/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { countLabel } from '../count-label';

const EmptyListCell = () => {
  const { records } = useTesseraStrings();
  return <Text className="field-kit__muted">{countLabel(0, records)}</Text>;
};

export { EmptyListCell };
