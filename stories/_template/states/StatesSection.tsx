/* @layer stories @kind component */
import { useRef } from 'react';
import { Box, Text } from '../../../src/primitives';
import { FORCE_ATTRIBUTE, FORCED_WITH } from './states.constants';
import { useForcedPseudoStates } from './use-forced-pseudo-states';
import type { OverviewStates, PseudoState, StateEntry } from './states.type';

const forcedTokens = (pseudo: StateEntry['pseudo']): string | undefined => {
  if (pseudo === undefined) return undefined;
  const list: readonly PseudoState[] = typeof pseudo === 'string' ? [pseudo] : pseudo;
  return [...new Set(list.flatMap((name) => FORCED_WITH[name]))].join(' ');
};

const StatesSection = (props: OverviewStates) => {
  const { render, list } = props;
  const ref = useRef<HTMLElement>(null);
  useForcedPseudoStates(ref);
  return (
    <Box as="section" className="overview__section">
      <Text as="h2" className="overview__heading">States</Text>
      <Box ref={ref} className="overview__showcase story-list">
        {list.map((entry) => (
          <Box key={entry.name} className="story-list__item">
            <Text className="story-label">{entry.name}</Text>
            <Box {...{ [FORCE_ATTRIBUTE]: forcedTokens(entry.pseudo) }}>{(entry.render ?? render)(entry.props ?? {})}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { StatesSection };
