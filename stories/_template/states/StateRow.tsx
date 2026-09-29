/* @layer stories @kind component */
import { useLayoutEffect, useRef } from 'react';
import { Box, Text } from '../../../src/primitives';
import { FORCE_ATTRIBUTE } from './states.constants';
import { forcedTokens } from './forced-tokens';
import type { StateRender, StateEntry } from './states.type';

interface StateRowProps {
  entry: StateEntry;
  render: StateRender;
}

const StateRow = (props: StateRowProps) => {
  const { entry, render } = props;
  const hostRef = useRef<HTMLElement>(null);
  const tokens = forcedTokens(entry.pseudo);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || tokens === undefined) return undefined;
    const target = entry.target === undefined ? host.firstElementChild : host.querySelector(entry.target);
    if (!target) return undefined;
    target.setAttribute(FORCE_ATTRIBUTE, tokens);
    return () => target.removeAttribute(FORCE_ATTRIBUTE);
  }, [tokens, entry.target]);

  return (
    <Box className="story-list__item">
      <Text className="story-label">{entry.name}</Text>
      <Box ref={hostRef}>{(entry.render ?? render)(entry.props ?? {})}</Box>
    </Box>
  );
};

export { StateRow };
