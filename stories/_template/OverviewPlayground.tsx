/* @layer stories @kind component */
import type { ReactNode } from 'react';
import type { StoryLiteArgs } from '@storylite/storylite';
import { Box, CodeBlock, Text } from '../../src/primitives';
import { PlaygroundCard } from './controls/PlaygroundCard';
import type { PlaygroundArgTypes } from './controls/playground.type';
import { useStoryArgs } from './controls/useStoryArgs';

interface OverviewPlaygroundProps {
  argTypes: PlaygroundArgTypes;
  defaults: StoryLiteArgs;
  draw: (args: StoryLiteArgs) => ReactNode;
  snippet: ((node: ReactNode) => string) | null;
}

const OverviewPlayground = (props: OverviewPlaygroundProps) => {
  const { argTypes, defaults, draw, snippet } = props;
  const { args, baseline, setArg, reset } = useStoryArgs(defaults, argTypes);
  const live = draw(args);
  return (
    <>
      <Box as="section" className="overview__section">
        <Text as="h2" className="overview__heading">Playground</Text>
        <PlaygroundCard live={live} argTypes={argTypes} args={args} defaults={baseline} onChange={setArg} onReset={reset} />
      </Box>
      {snippet !== null && (
      <Box as="section" className="overview__section">
        <Text as="h2" className="overview__heading">Code</Text>
        <CodeBlock code={snippet(live)} language="tsx" showLineNumbers copyable />
      </Box>
      )}
    </>
  );
};

export { OverviewPlayground };
export type { OverviewPlaygroundProps };
