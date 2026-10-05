/* @layer stories @kind component */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Stack, Tabs } from '../../../../src/primitives';
import { StageCrowd } from './StageCrowd';
import { StageDialogue } from './StageDialogue';
import { StageDirector } from './StageDirector';
import { StageFlips } from './StageFlips';
import { StageFollow } from './StageFollow';
import { StageLab } from './StageLab';
import { StageReduced } from './StageReduced';
import { StageSpeed } from './StageSpeed';
import { StageStress } from './StageStress';
import { StageTour } from './StageTour';
import { StageTuning } from './StageTuning';

const DEMOS: readonly { id: string; label: string; draw: () => ReactNode }[] = [
  { id: 'stage', label: 'Stage', draw: () => <StageLab /> },
  { id: 'director', label: 'Director', draw: () => <StageDirector /> },
  { id: 'dialogue', label: 'Dialogue', draw: () => <StageDialogue /> },
  { id: 'follow', label: 'Follow the pointer', draw: () => <StageFollow /> },
  { id: 'tour', label: 'Guided tour', draw: () => <StageTour /> },
  { id: 'tuning', label: 'Autonomy tuning', draw: () => <StageTuning /> },
  { id: 'flips', label: 'Flip every clip', draw: () => <StageFlips /> },
  { id: 'speed', label: 'Speed', draw: () => <StageSpeed /> },
  { id: 'reduced', label: 'Reduced motion', draw: () => <StageReduced /> },
  { id: 'stress', label: 'Stress', draw: () => <StageStress /> },
  { id: 'crowd', label: 'Crowd', draw: () => <StageCrowd /> },
];

const StageTabs = () => {
  const [active, setActive] = useState('stage');
  const demo = DEMOS.find((d) => d.id === active) ?? DEMOS[0];
  return (
    <Stack gap="lg">
      <Tabs tabs={DEMOS.map((d) => ({ id: d.id, label: d.label }))} activeTab={active} onTabChange={setActive} />
      {demo?.draw()}
    </Stack>
  );
};

export { StageTabs };
