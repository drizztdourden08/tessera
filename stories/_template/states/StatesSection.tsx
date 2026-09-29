/* @layer stories @kind component */
import { useRef } from 'react';
import { Box, Text } from '../../../src/primitives';
import { StateRow } from './StateRow';
import { useForcedPseudoStates } from './use-forced-pseudo-states';
import type { OverviewStates } from './states.type';

const StatesSection = (props: OverviewStates) => {
  const { render, list } = props;
  const ref = useRef<HTMLElement>(null);
  useForcedPseudoStates(ref);
  return (
    <Box as="section" className="overview__section">
      <Text as="h2" className="overview__heading">States</Text>
      <Box ref={ref} className="overview__showcase story-list">
        {list.map((entry) => <StateRow key={entry.name} entry={entry} render={render} />)}
      </Box>
    </Box>
  );
};

export { StatesSection };
