/* @layer stories @kind data */
import type { ReactNode } from 'react';
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { StageCrowd } from './StageCrowd';
import { StageDialogue } from './StageDialogue';
import { StageDirector } from './StageDirector';
import { StageFlips } from './StageFlips';
import { StageFollow } from './StageFollow';
import { StageLab } from './StageLab';
import { StageReduced } from './StageReduced';
import { StageSideBySide } from './StageSideBySide';
import { StageSpeed } from './StageSpeed';
import { StageStress } from './StageStress';
import { StageTour } from './StageTour';
import { StageTuning } from './StageTuning';

const story = (name: string, render: () => ReactNode): StoryLiteStoryDefinition<Record<string, never>> => ({ name, render });

const STAGE_STORIES = {
  Stage: story('Stage', () => <StageLab />),
  Director: story('Director', () => <StageDirector />),
  Dialogue: story('Dialogue', () => <StageDialogue />),
  Follow: story('Follow the pointer', () => <StageFollow />),
  Tour: story('Guided tour', () => <StageTour />),
  Tuning: story('Autonomy tuning', () => <StageTuning />),
  Flips: story('Flip every clip', () => <StageFlips />),
  Speed: story('Speed', () => <StageSpeed />),
  Reduced: story('Reduced motion', () => <StageReduced />),
  Stress: story('Stress', () => <StageStress />),
  SideBySide: story('Side by side', () => <StageSideBySide />),
  Crowd: story('Crowd', () => <StageCrowd />),
};

export { STAGE_STORIES };
