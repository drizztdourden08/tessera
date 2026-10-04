/* @layer stories @kind logic */
import type { ActorCore } from './actor.type';
import { AUTONOMY_RULES } from './autonomy-rules.constants';
import type { AutonomyConfig, AutonomyContext, AutonomyRule } from './autonomy.type';
import { seededRandom } from './seeded-random';
import type { StepRunner } from './step-runner.type';

const AUTONOMY_PRIORITY = 0;
const DEFAULT_PAUSE: readonly [number, number] = [1800, 5200];
const NAP_AFTER_MS = 45000;

interface Director {
  tick: (now: number) => void;
}

const choose = (rules: readonly AutonomyRule[], context: AutonomyContext, used: ReadonlyMap<string, number>, last: string | undefined): AutonomyRule | undefined => {
  const open = rules.filter((r) => r.id !== last && context.now - (used.get(r.id) ?? -Infinity) >= r.cooldown && (r.when?.(context) ?? true));
  const total = open.reduce((sum, r) => sum + r.weight, 0);
  let roll = context.random() * total;
  return open.find((r) => (roll -= r.weight) < 0);
};

const createDirector = (actor: ActorCore, runner: StepRunner, config: AutonomyConfig): Director => {
  const rules = config.rules ?? AUTONOMY_RULES;
  const [shortest, longest] = config.pause ?? DEFAULT_PAUSE;
  const random = seededRandom(config.seed ?? Math.floor(Math.random() * 2 ** 31));
  const used = new Map<string, number>();
  let last: string | undefined;
  let nextAt = -Infinity;
  let wasIdle = false;
  return {
    tick: (now) => {
      const idle = runner.idle();
      if (idle && !wasIdle) nextAt = now + shortest + random() * (longest - shortest);
      wasIdle = idle;
      if (!idle || now < nextAt) return;
      const context: AutonomyContext = {
        now, x: actor.x, home: actor.home, min: actor.bounds.min, max: actor.bounds.max, facing: actor.facing, idleFor: now - actor.lastHost, napAfter: config.napAfter ?? NAP_AFTER_MS, random,
      };
      const rule = choose(rules, context, used, last);
      nextAt = now + shortest;
      if (!rule) return;
      used.set(rule.id, now);
      last = rule.id;
      wasIdle = false;
      actor.emit({ type: 'behaviour', behaviour: rule.id, x: actor.x });
      void runner.enqueue(rule.steps(context), AUTONOMY_PRIORITY, false, now);
    },
  };
};

export { createDirector };
export type { Director };
