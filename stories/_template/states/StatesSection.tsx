/* @layer stories @kind component */
import { useRef } from 'react';
import { Box, Text } from '../../../src/primitives';
import { Demonstrator } from '../Demonstrator';
import { StateCell } from './StateCell';
import { useForcedPseudoStates } from './use-forced-pseudo-states';
import type { OverviewStates } from './states.type';

const StatesSection = (props: OverviewStates) => {
  const { render, list } = props;
  const ref = useRef<HTMLElement>(null);
  useForcedPseudoStates(ref);
  return (
    <Box as="section" className="overview__section">
      <Text as="h2" className="overview__heading">States</Text>
      <Box ref={ref} className="overview__showcase">
        <Demonstrator
          rows={list.map((entry) => ({ key: entry.name, label: entry.name }))}
          cell={(name) => {
            const entry = list.find((item) => item.name === name);
            return entry ? <StateCell entry={entry} render={render} /> : null;
          }}
        />
      </Box>
    </Box>
  );
};

export { StatesSection };
