/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { StatRow } from '../../../primitives/StatRow';
import { FactsPanelCopy } from './FactsPanelCopy';
import { FactsPanelValue } from './FactsPanelValue';
import type { FactsPanelGroupProps } from '../FactsPanel.type';

const FactsPanelRows = (props: FactsPanelGroupProps) => {
  const { group } = props;
  return (
    <Box className="facts-panel__group">
      {group.map((fact) => (
        <StatRow
          key={fact.label}
          className="facts-panel__fact"
          label={fact.label}
          value={fact.copyable ? <FactsPanelCopy fact={fact} /> : <FactsPanelValue fact={fact} />}
          mono={fact.mono}
        />
      ))}
    </Box>
  );
};

export { FactsPanelRows };
