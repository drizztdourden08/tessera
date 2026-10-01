/* @layer stories @kind logic */
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { ControlSize } from '../../src/primitives';
import { axis } from './axis';
import { CONTROL_SIZES } from './control-sizes.constants';
import { Demonstrator } from './Demonstrator';
import type { DemonstratorProps } from './Demonstrator.type';

const sizesStory = <A extends StoryLiteArgs>(
  cell: (size: ControlSize) => ReactNode,
  layout: Pick<DemonstratorProps<ControlSize, never>, 'align' | 'valign'> = {},
): StoryLiteStoryDefinition<A> => ({
  name: 'Sizes',
  render: () => <Demonstrator rows={axis(CONTROL_SIZES)} cell={cell} {...layout} />,
});

export { sizesStory };
