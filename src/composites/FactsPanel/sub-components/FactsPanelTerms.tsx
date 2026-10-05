/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { FactsPanelGroupProps } from '../FactsPanel.type';
import { FactsPanelValue } from './FactsPanelValue';

const FactsPanelTerms = (props: FactsPanelGroupProps) => {
  const { group } = props;
  return (
    <Box as="dl" className="facts-panel__group">
      {group.map((fact) => (
        <Box key={fact.label} className="facts-panel__term">
          <Box as="dt" className="facts-panel__term-label">{`${fact.label}:`}</Box>
          <Box as="dd" className="facts-panel__term-value" data-mono={fact.mono ? '' : undefined}><FactsPanelValue fact={fact} /></Box>
        </Box>
      ))}
    </Box>
  );
};

export { FactsPanelTerms };
