/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import type { FactsPanelProps } from './FactsPanel.type';
import { FactsPanelRows } from './sub-components/FactsPanelRows';
import { FactsPanelTerms } from './sub-components/FactsPanelTerms';
import './FactsPanel.css';

const FactsPanel = (props: FactsPanelProps) => {
  const { groups, layout = 'inline', align, label, className } = props;
  const Group = layout === 'terms' ? FactsPanelTerms : FactsPanelRows;
  return (
    <Box className={['facts-panel', `facts-panel--${layout}`, className].filter(Boolean).join(' ')} role="group" aria-label={label} data-align={align}>
      {groups.map((group, i) => (
        <Group key={group.map((fact) => fact.label).join('|') || i} group={group} align={align ?? (layout === 'inline' ? 'start' : undefined)} />
      ))}
    </Box>
  );
};

export { FactsPanel };
