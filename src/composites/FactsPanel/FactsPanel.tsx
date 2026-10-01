/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { StatRow } from '../../primitives/StatRow';
import { Tooltip } from '../../primitives/Tooltip';
import type { FactsPanelProps } from './FactsPanel.type';
import './FactsPanel.css';

const FactsPanel = (props: FactsPanelProps) => {
  const { groups, label, className } = props;
  return (
    <Box className={['facts-panel', className].filter(Boolean).join(' ')} role="group" aria-label={label}>
      {groups.map((group, i) => (
        <Box key={group.map((fact) => fact.label).join('|') || i} className="facts-panel__group">
          {group.map((fact) => (
            <StatRow
              key={fact.label}
              className="facts-panel__fact"
              label={fact.label}
              value={fact.title ? <Tooltip content={fact.title}>{fact.value}</Tooltip> : fact.value}
              mono={fact.mono}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export { FactsPanel };
