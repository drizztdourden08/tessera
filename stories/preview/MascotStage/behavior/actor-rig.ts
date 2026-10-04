/* @layer stories @kind logic */
import type { AnimatedMascotBrand } from '../../../../src/brand/AnimatedMascot/AnimatedMascot.type';
import { motionPivots } from '../../../../src/brand/AnimatedMascot/behavior/motion-pivots';
import { stageScene } from '../../../../src/brand/AnimatedMascot/behavior/stage-scene';
import { BRAND_FAMILY } from '../../../../src/brand/family.constants';
import type { MascotClip } from '../../../../src/brand/motion/mascot-clip.type';
import { compileClip } from '../sample/compile-clip';
import type { ActorRig } from './actor-rig.type';
import { UPRIGHT_EXTRAS } from './upright.constants';

const rigs = new Map<AnimatedMascotBrand, ActorRig>();

const uprightAxes = (brand: AnimatedMascotBrand, rig: Pick<ActorRig, 'motion'>): Map<string, number> => {
  const effects = new Map((rig.motion.effects ?? []).map((e) => [e.id, e]));
  const axes = new Map<string, number>();
  for (const group of UPRIGHT_EXTRAS[brand]) {
    const lead = effects.get(group[0] ?? '');
    if (!lead) continue;
    for (const id of group) if (effects.has(id)) axes.set(id, lead.at[0] + lead.piece.w / 2);
  }
  return axes;
};

const build = (brand: AnimatedMascotBrand): ActorRig | undefined => {
  const mascot = BRAND_FAMILY[brand].mascot;
  const motion = mascot?.motion;
  if (!mascot || !motion) return undefined;
  const pivots = motionPivots(motion);
  const clips = new Map(Object.entries(motion.animations).map(([id, clip]) => [id as MascotClip, compileClip(clip, pivots)]));
  return {
    mascot,
    motion,
    scene: stageScene(mascot.variants[0].compose(), motion),
    clips,
    ambient: motion.ambient ? compileClip(motion.ambient, pivots) : undefined,
    effects: new Set((motion.effects ?? []).map((e) => e.id)),
    pivots,
    anchor: motion.stage.left + motion.pivot[0],
    upright: uprightAxes(brand, { motion }),
  };
};

const actorRig = (brand: AnimatedMascotBrand): ActorRig | undefined => {
  const known = rigs.get(brand);
  if (known) return known;
  const rig = build(brand);
  if (rig) rigs.set(brand, rig);
  return rig;
};

export { actorRig };
