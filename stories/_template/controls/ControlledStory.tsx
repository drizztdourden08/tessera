/* @layer stories @kind component */
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteArgType, StoryLiteStoryContext } from '@storylite/storylite';
import { Box } from '../../../src/primitives';
import { ArgControls } from './ArgControls';
import { useStoryArgs } from './useStoryArgs';

interface ControlledStoryProps {
  render: (args: StoryLiteArgs, context: StoryLiteStoryContext) => unknown;
  argTypes: Readonly<Record<string, StoryLiteArgType | undefined>>;
  initialArgs: StoryLiteArgs;
  context: StoryLiteStoryContext;
}

const ControlledStory = (props: ControlledStoryProps) => {
  const { render, argTypes, initialArgs, context } = props;
  const { args, setArg, reset } = useStoryArgs(initialArgs);
  return (
    <Box className="controlled-story">
      {render(args, context) as ReactNode}
      <ArgControls argTypes={argTypes} args={args} onChange={setArg} onReset={reset} />
    </Box>
  );
};

export { ControlledStory };
