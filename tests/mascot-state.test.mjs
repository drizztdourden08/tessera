/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedMascot } from '../src/brand';
import { mascotBrandOf } from '../src/brand/AnimatedMascot/behavior/mascot-brand-of';
import { actorRig } from '../src/brand/MascotStage/behavior/actor-rig';
import { actorScene } from '../src/brand/MascotStage/behavior/actor-scene';
import { createActor } from '../src/brand/MascotStage/behavior/create-actor';
import { evaluateSource } from '../src/brand/MascotStage/behavior/evaluate-source';
import { facingValue } from '../src/brand/MascotStage/behavior/facing-value';
import { BLEND_MS, CLIP_RULES, EXTRAS_FADE_MS, TURN_MS } from '../src/brand/MascotStage/behavior/transition-rules.constants';

const stageActor = (brand = 'rotp', clip = undefined) => {
  const clock = { t: 0 };
  const cast = { id: 'one', brand, ...(clip ? { clip } : {}) };
  const actor = createActor({ cast, rig: actorRig(brand), x: 0, now: () => clock.t, emit: () => undefined });
  const at = (t) => {
    const dt = (t - clock.t) / 1000;
    clock.t = t;
    actor.runner.tick(t, dt);
  };
  return { core: actor.core, handle: actor.handle, at };
};

const durationOf = (brand, clip) => actorRig(brand).clips.get(clip).duration;

describe('mascot states', () => {
  it('starts in the clip it is given, with no blend', () => {
    const { core } = stageActor('rotp', 'sleep');
    expect(core.source).toMatchObject({ kind: 'clip', id: 'sleep' });
  });

  it('blends into a new state from where it is, in the middle of a clip, with the blend time of the new clip', () => {
    const { core, handle, at } = stageActor();
    void handle.play('wave');
    at(400);
    void handle.play('scan');
    expect(core.source.kind).toBe('blend');
    expect(core.source.to).toMatchObject({ kind: 'clip', id: 'scan', start: 400 });
    expect(core.source.body).toBe(BLEND_MS);
    expect(core.source.extras).toBe(EXTRAS_FADE_MS);
    void handle.play('jump');
    expect(core.source.body).toBe(CLIP_RULES.jump.blendIn);
    expect(core.source.from.kind).toBe('blend');
  });

  it('lets a jump finish its leap before a new state starts, then starts it', async () => {
    const { core, handle, at } = stageActor();
    const jump = durationOf('rotp', 'jump');
    void handle.play('jump');
    at(jump * 0.3);
    const wave = handle.play('wave');
    expect(handle.state().clip).toBe('jump');
    expect(core.waiting?.step).toMatchObject({ play: 'wave' });
    at(jump * 0.8);
    expect(handle.state().clip).toBe('wave');
    expect(core.waiting).toBeUndefined();
    at(jump * 0.8 + durationOf('rotp', 'wave') + 10);
    await expect(wave).resolves.toBe('done');
  });

  it('lets an alert cut into a protected moment at once', () => {
    const { handle, at } = stageActor();
    void handle.play('jump');
    at(durationOf('rotp', 'jump') * 0.3);
    void handle.play('alert');
    expect(handle.state().clip).toBe('alert');
  });

});

describe('mascot state endings and rules', () => {
  it('goes back to rest when a clip that plays once ends, and reports it done', async () => {
    const { core, handle, at } = stageActor();
    const done = handle.play('wave');
    at(durationOf('rotp', 'wave') + 5);
    await expect(done).resolves.toBe('done');
    expect(core.source.kind).toBe('blend');
    expect(core.source.to).toMatchObject({ id: 'idle' });
    expect(core.source.body).toBe(CLIP_RULES.idle.blendIn);
  });

  it('reports a state that another one replaced as interrupted', async () => {
    const { handle } = stageActor();
    const wave = handle.play('wave');
    void handle.play('scan');
    await expect(wave).resolves.toBe('interrupted');
  });

  it('cross-fades the eyes of Sentri over the extras time, at least as long as the body blend, so the face never pops', () => {
    const { core, handle } = stageActor();
    void handle.play('sleep');
    const context = { effects: core.rig.effects, reduced: false };
    const closed = (t) => evaluateSource(core.source, t, context).get('closed')?.opacity ?? 0;
    expect(closed(0)).toBe(0);
    const span = core.source.extras;
    expect(span).toBe(Math.max(CLIP_RULES.sleep.blendIn, EXTRAS_FADE_MS));
    const steps = [0.25, 0.5, 0.75].map((share) => closed(span * share));
    expect(steps[0]).toBeGreaterThan(0);
    expect(steps[2]).toBeLessThan(1);
    expect([...steps].sort((a, b) => a - b)).toEqual(steps);
    const end = span + 10;
    expect(closed(end)).toBeCloseTo(evaluateSource(core.source.to, end, context).get('closed').opacity);
  });

  it('turns round smoothly without leaving its state, and keeps its symbols upright', () => {
    const { core, handle } = stageActor('rotp', 'curious');
    handle.turn('left');
    expect(handle.state()).toMatchObject({ facing: 'left', clip: 'curious' });
    expect(facingValue(core, TURN_MS / 2)).toBeCloseTo(0, 5);
    expect(facingValue(core, TURN_MS)).toBe(-1);
    const scene = JSON.stringify(actorScene(core.rig, new Set(['question'])));
    for (const part of ['question', 'exclaim', 'zBig', 'laptop']) expect(scene).toContain(`"part":"upright:${part}"`);
  });

  it('gives every mascot the same list of states', () => {
    const [sentri, flint, pelago] = ['rotp', 'brock', 'archipelia'].map((brand) => [...actorRig(brand).clips.keys()]);
    expect(flint).toEqual(sentri);
    expect(pelago).toEqual(sentri);
    expect(sentri).toHaveLength(29);
  });
});

describe('AnimatedMascot brand="auto"', () => {
  it('picks the mascot of a brand palette, and none for a palette without one', () => {
    expect(mascotBrandOf('rotp')).toBe('rotp');
    expect(mascotBrandOf('brock')).toBe('brock');
    expect(mascotBrandOf('archipelia')).toBe('archipelia');
    expect(mascotBrandOf('tessera')).toBeNull();
    expect(mascotBrandOf(undefined)).toBeNull();
  });

  it('draws nothing on the server until it reads the palette', () => {
    const html = renderToString(h(AnimatedMascot, { brand: 'auto', animation: 'scan' }));
    expect(html).toContain('animated-mascot-auto"');
    expect(html).toContain('data-mascot="none"');
    expect(html).not.toContain('<svg');
  });
});
