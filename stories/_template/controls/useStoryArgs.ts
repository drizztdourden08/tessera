/* @layer stories @kind hook */
import { useCallback, useState } from 'react';
import type { StoryLiteArgs } from '@storylite/storylite';

const useStoryArgs = <A extends StoryLiteArgs>(initial: A) => {
  const [args, setArgs] = useState<A>(initial);
  const setArg = useCallback((name: string, value: unknown) => setArgs((current) => ({ ...current, [name]: value })), []);
  const reset = useCallback(() => setArgs(initial), [initial]);
  return { args, setArg, reset };
};

export { useStoryArgs };
