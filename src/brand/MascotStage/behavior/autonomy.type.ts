/* @layer renderer-components @kind types */
import type { MascotFacing, MascotStep } from '../MascotStage.type';

interface MascotAutonomyContext {
  now: number;
  x: number;
  home: number;
  min: number;
  max: number;
  facing: MascotFacing;
  idleFor: number;
  napAfter: number;
  random: () => number;
}

interface MascotAutonomyRule {
  id: string;
  weight: number;
  cooldown: number;
  when?: (context: MascotAutonomyContext) => boolean;
  steps: (context: MascotAutonomyContext) => readonly MascotStep[];
}

interface MascotAutonomyConfig {
  rules?: readonly MascotAutonomyRule[];
  pause?: readonly [number, number];
  napAfter?: number;
  seed?: number;
}

export type { MascotAutonomyConfig, MascotAutonomyContext, MascotAutonomyRule };
