/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { StatRow } from '../../../primitives/StatRow';
import { Tooltip } from '../../../primitives/Tooltip';
import type { HeroFactsProps } from '../Hero.type';

const HeroFacts = (props: HeroFactsProps) => {
  const { rows } = props;
  return (
    <Box className="hero__glass hero__facts">
      {rows.map((row, i) => (
        <Box key={row.map((fact) => fact.label).join('|') || i} className="hero__fact-row">
          {row.map((fact) => (
            <StatRow
              key={fact.label}
              className="hero__fact"
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

export { HeroFacts };
