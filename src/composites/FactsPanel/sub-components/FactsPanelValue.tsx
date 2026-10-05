/* @layer renderer-components @kind component */
import { Tooltip } from '../../../primitives/Tooltip';
import type { FactsPanelValueProps } from '../FactsPanel.type';

const FactsPanelValue = (props: FactsPanelValueProps) => {
  const { fact } = props;
  if (!fact.title) return fact.value;
  return <Tooltip content={fact.title} focusable>{fact.value}</Tooltip>;
};

export { FactsPanelValue };
