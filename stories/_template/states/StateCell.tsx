/* @layer stories @kind component */
import { useLayoutEffect, useRef } from 'react';
import { Box } from '../../../src/primitives';
import { FORCE_ATTRIBUTE } from './states.constants';
import { forcedTokens } from './forced-tokens';
import type { StateCellProps } from './states.type';

const StateCell = (props: StateCellProps) => {
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

  return <Box ref={hostRef} inert>{(entry.render ?? render)(entry.props ?? {})}</Box>;
};

export { StateCell };
