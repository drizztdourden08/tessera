/* @layer renderer-components @kind types */
import type { Facing, MascotStep } from '../MascotStage.type';

/** What a rule sees when the director picks the next behaviour. */
interface AutonomyContext {
  now: number;
  x: number;
  home: number;
  /** Lowest and highest x the mascot can stand on. */
  min: number;
  max: number;
  facing: Facing;
  /** Milliseconds since the host last gave a command. */
  idleFor: number;
  /** A number from 0 up to 1, seeded so a run can repeat. */
  random: () => number;
}

interface AutonomyRule {
  id: string;
  /** Relative chance against the other rules that pass. */
  weight: number;
  /** Milliseconds before this rule can be picked again. */
  cooldown: number;
  /** Extra condition; the rule is skipped while it returns false. */
  when?: (context: AutonomyContext) => boolean;
  steps: (context: AutonomyContext) => readonly MascotStep[];
}

interface AutonomyConfig {
  rules?: readonly AutonomyRule[];
  /** Rest between behaviours, from and to, in milliseconds. */
  pause?: readonly [number, number];
  seed?: number;
}

export type { AutonomyConfig, AutonomyContext, AutonomyRule };
