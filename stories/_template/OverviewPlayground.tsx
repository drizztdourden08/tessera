/* @layer stories @kind component */
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteArgType } from '@storylite/storylite';
import { Box, CodeBlock, Text } from '../../src/primitives';
import { ArgControls } from './controls/ArgControls';
import { useStoryArgs } from './controls/useStoryArgs';

interface OverviewPlaygroundProps {
  argTypes: Readonly<Record<string, StoryLiteArgType | undefined>>;
  defaults: StoryLiteArgs;
  draw: (args: StoryLiteArgs) => ReactNode;
  snippet: ((node: ReactNode) => string) | null;
}

const OverviewPlayground = (props: OverviewPlaygroundProps) => {
  const { argTypes, defaults, draw, snippet } = props;
  const { args, setArg, reset } = useStoryArgs(defaults);
  const live = draw(args);
  return (
    <>
      <Box as="section" className="overview__section">
        <Text as="h2" className="overview__heading">Playground</Text>
        <Box className="overview__showcase overview__showcase--stage">{live}</Box>
        <ArgControls argTypes={argTypes} args={args} onChange={setArg} onReset={reset} />
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
