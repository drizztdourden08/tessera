/* @layer stories @kind component */
import type { ReactNode } from 'react';
import type { StoryLiteArgs } from '@storylite/storylite';
import { Box } from '../../../src/primitives';
import { ArgControls } from './ArgControls';
import type { PlaygroundArgTypes } from './playground.type';
import '../overview.css';

interface PlaygroundCardProps {
  live: ReactNode;
  argTypes: PlaygroundArgTypes;
  args: StoryLiteArgs;
  defaults: StoryLiteArgs;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}

const PlaygroundCard = (props: PlaygroundCardProps) => {
  const { live, ...panel } = props;
  return (
    <Box className="playground">
      <Box className="overview__showcase playground__stage">{live}</Box>
      <ArgControls {...panel} />
    </Box>
  );
};

export { PlaygroundCard };
