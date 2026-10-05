/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import { MASCOT_AUTONOMY_RULES } from './autonomy-rules.constants';
import type { MascotAutonomyConfig, MascotAutonomyContext, MascotAutonomyRule } from './autonomy.type';
import { seededRandom } from './seeded-random';
import { DEFAULT_PAUSE, NAP_AFTER_MS } from './create-director.constants';
import type { Director } from './create-director.type';
import { AUTONOMY_PRIORITY } from './stage-priority.constants';
import type { StepRunner } from './step-runner.type';

const choose = (rules: readonly MascotAutonomyRule[], context: MascotAutonomyContext, used: ReadonlyMap<string, number>, last: string | undefined): MascotAutonomyRule | undefined => {
  const open = rules.filter((r) => r.id !== last && context.now - (used.get(r.id) ?? -Infinity) >= r.cooldown && (r.when?.(context) ?? true));
  const total = open.reduce((sum, r) => sum + r.weight, 0);
  let roll = context.random() * total;
  return open.find((r) => (roll -= r.weight) < 0);
};

const createDirector = (actor: ActorCore, runner: StepRunner, config: MascotAutonomyConfig): Director => {
  const rules = config.rules ?? MASCOT_AUTONOMY_RULES;
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
      const context: MascotAutonomyContext = {
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
