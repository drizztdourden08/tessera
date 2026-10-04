/* @layer stories @kind component */
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteStoryContext } from '@storylite/storylite';
import { PlaygroundCard } from './PlaygroundCard';
import type { PlaygroundArgTypes } from './playground.type';
import { useStoryArgs } from './useStoryArgs';

interface ControlledStoryProps {
  render: (args: StoryLiteArgs, context: StoryLiteStoryContext) => unknown;
  argTypes: PlaygroundArgTypes;
  initialArgs: StoryLiteArgs;
  context: StoryLiteStoryContext;
}

const ControlledStory = (props: ControlledStoryProps) => {
  const { render, argTypes, initialArgs, context } = props;
  const { args, baseline, setArg, reset } = useStoryArgs(initialArgs, argTypes);
  const live = render(args, context) as ReactNode;
  return <PlaygroundCard live={live} argTypes={argTypes} args={args} defaults={baseline} onChange={setArg} onReset={reset} />;
};

export { ControlledStory };
