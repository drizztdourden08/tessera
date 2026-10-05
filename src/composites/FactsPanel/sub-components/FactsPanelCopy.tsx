/* @layer renderer-components @kind component */
import { CopyValue } from '../../CopyValue';
import { copyText } from '../../CopyValue/behavior/copy-text';
import type { FactsPanelValueProps } from '../FactsPanel.type';
import { FactsPanelValue } from './FactsPanelValue';

const FactsPanelCopy = (props: FactsPanelValueProps) => {
  const { fact } = props;
  const text = copyText(fact.value, typeof fact.copyable === 'string' ? fact.copyable : undefined);
  return <CopyValue value={<FactsPanelValue fact={fact} />} text={text} label={fact.label} mono={fact.mono} truncate="end" className="facts-panel__copy" />;
};

export { FactsPanelCopy };
