/* @layer renderer-components @kind component */
import { useImperativeHandle, useRef } from 'react';
import { BRAND_FAMILY } from '../family.constants';
import { STAGE_HEIGHT } from './MascotStage.constants';
import type { MascotStageProps } from './MascotStage.type';
import { useStageEngine } from './behavior/useStageEngine';
import { StageActor } from './sub-components/StageActor';
import './MascotStage.css';
import { Box } from '../../primitives/Box';

const MascotStage = (props: MascotStageProps) => {
  const { cast, height = STAGE_HEIGHT, playing = true, speed = 1, motion = 'system', className = '', label, onEvent, ref } = props;
  const stageRef = useRef<HTMLElement>(null);
  const engine = useStageEngine(stageRef, { cast, height, playing, speed, motion, onEvent });
  useImperativeHandle(ref, () => engine.handle, [engine]);
  const names = cast.map((c) => BRAND_FAMILY[c.brand].mascot?.name ?? c.id).join(', ');
  return (
    <Box ref={stageRef} className={['mascot-stage', className].filter(Boolean).join(' ')} style={{ blockSize: height }} role="img" aria-label={label ?? names}>
      {cast.map((entry, index) => <StageActor key={entry.id} cast={entry} index={index} count={cast.length} height={height} engine={engine} />)}
    </Box>
  );
};

export { MascotStage };
