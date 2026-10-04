/* @layer stories @kind hook */
import { useCallback, useMemo, useState } from 'react';
import type { StoryLiteArgs } from '@storylite/storylite';
import type { PlaygroundArgTypes } from './playground.type';
import { settleArgs } from './settle-args';

const useStoryArgs = (initial: StoryLiteArgs, argTypes: PlaygroundArgTypes) => {
  const baseline = useMemo(() => settleArgs(argTypes, initial, initial), [argTypes, initial]);
  const [args, setArgs] = useState<StoryLiteArgs>(baseline);
  const setArg = useCallback(
    (name: string, value: unknown) => setArgs((current) => settleArgs(argTypes, { ...current, [name]: value }, initial)),
    [argTypes, initial],
  );
  const reset = useCallback(() => setArgs(baseline), [baseline]);
  return { args, baseline, setArg, reset };
};

export { useStoryArgs };
