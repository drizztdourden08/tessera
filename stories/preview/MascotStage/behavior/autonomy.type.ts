/* @layer stories @kind types */
import type { Facing, MascotStep } from '../MascotStage.type';

interface AutonomyContext {
  now: number;
  x: number;
  home: number;
  min: number;
  max: number;
  facing: Facing;
  idleFor: number;
  napAfter: number;
  random: () => number;
}

interface AutonomyRule {
  id: string;
  weight: number;
  cooldown: number;
  when?: (context: AutonomyContext) => boolean;
  steps: (context: AutonomyContext) => readonly MascotStep[];
}

interface AutonomyConfig {
  rules?: readonly AutonomyRule[];
  pause?: readonly [number, number];
  napAfter?: number;
  seed?: number;
}

export type { AutonomyConfig, AutonomyContext, AutonomyRule };
