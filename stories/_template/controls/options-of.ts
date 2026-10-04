/* @layer stories @kind logic */
import type { StoryLiteArgs } from '@storylite/storylite';
import type { PlaygroundArgType } from './playground.type';

const optionsOf = (argType: PlaygroundArgType, args: StoryLiteArgs): readonly unknown[] => {
  const { options } = argType;
  if (typeof options === 'function') return options(args);
  return options ?? [];
};

export { optionsOf };
