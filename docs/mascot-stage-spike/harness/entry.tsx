// Fidelity harness: the approved playback (playClip on WAAPI) against three candidate engines,
// all seeked to the same millisecond. Not part of the repo; bundled with esbuild from lib-eval.
import { renderToStaticMarkup } from 'react-dom/server';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { interpolate, cubicBezier as motionBezier } from 'motion';
import { BRAND_FAMILY } from '../../stage-spike/src/brand/family.constants';
import { BrandScene } from '../../stage-spike/src/brand/BrandScene';
import { mascotStage } from '../../stage-spike/src/brand/AnimatedMascot/behavior/mascot-stage';
import { stageScene } from '../../stage-spike/src/brand/AnimatedMascot/behavior/stage-scene';
import { playClip } from '../../stage-spike/src/brand/AnimatedMascot/behavior/play-clip';
import { motionPivots } from '../../stage-spike/src/brand/AnimatedMascot/behavior/motion-pivots';
import { compileClip } from '../../stage-spike/src/brand/motion/sample/compile-clip';
import { sampleTrack } from '../../stage-spike/src/brand/motion/sample/sample-track';
import { poseTransform } from '../../stage-spike/src/brand/motion/sample/pose-transform';
import { EASE } from '../../stage-spike/src/brand/motion/motion.constants';
import type { MascotAnimation, MotionTrack } from '../../stage-spike/src/brand/motion/motion.type';
import type { PartPose } from '../../stage-spike/src/brand/motion/sample/sample.type';

gsap.registerPlugin(CustomEase);

type Brand = 'rotp' | 'brock' | 'archipelia';
type Interp = (progress: number) => PartPose;
type InterpMaker = (track: MotionTrack, pivot: [number, number], rest: number, clip: MascotAnimation) => Interp;

const CHANNELS = ['x', 'y', 'rotate', 'scaleX', 'scaleY', 'opacity'] as const;

const resolved = (track: MotionTrack, pivot: [number, number], rest: number) => {
  const frames = [...track.frames];
  if ((frames[0]?.at ?? 0) > 0) frames.unshift({ at: 0, ease: EASE.linear });
  if ((frames[frames.length - 1]?.at ?? 1) < 1) frames.push({ at: 1, ease: EASE.linear });
  const num = (n: number) => Number(n.toFixed(4));
  return frames.map((f) => ({
    at: f.at,
    ease: f.ease ?? EASE.inOut,
    x: num(pivot[0] + (f.x ?? 0)) - pivot[0],
    y: num(pivot[1] + (f.y ?? 0)) - pivot[1],
    rotate: f.rotate ?? 0,
    scaleX: f.scaleX ?? f.scale ?? 1,
    scaleY: f.scaleY ?? f.scale ?? 1,
    opacity: f.opacity ?? rest,
  }));
};

const bezierArgs = (spec: string): number[] | undefined => {
  const m = /^cubic-bezier\(([^)]+)\)$/.exec(spec);
  return m ? (m[1] ?? '').split(',').map(Number) : undefined;
};

let gsapEases = 0;
const gsapEase = (spec: string): string | ((t: number) => number) => {
  const args = bezierArgs(spec);
  if (!args) return 'none';
  gsapEases += 1;
  return CustomEase.create(`e${gsapEases}`, args.join(','));
};

const gsapInterp: InterpMaker = (track, pivot, rest) => {
  const frames = resolved(track, pivot, rest);
  const first = frames[0]!;
  const obj: Record<string, number> = Object.fromEntries(CHANNELS.map((c) => [c, first[c]]));
  const tl = gsap.timeline({ paused: true });
  for (let i = 0; i < frames.length - 1; i += 1) {
    const from = frames[i]!;
    const to = frames[i + 1]!;
    const vars = Object.fromEntries(CHANNELS.map((c) => [c, to[c]]));
    const span = to.at - from.at;
    if (span <= 0) tl.set(obj, vars, from.at);
    else tl.to(obj, { ...vars, duration: span, ease: gsapEase(from.ease), immediateRender: false }, from.at);
  }
  return (progress) => {
    tl.seek(progress, true);
    return { ...(obj as unknown as PartPose) };
  };
};

const motionInterp: InterpMaker = (track, pivot, rest) => {
  const frames = resolved(track, pivot, rest);
  const offsets = frames.map((f) => f.at);
  const ease = frames.slice(0, -1).map((f) => {
    const args = bezierArgs(f.ease);
    return args ? motionBezier(args[0]!, args[1]!, args[2]!, args[3]!) : (t: number) => t;
  });
  const fns = CHANNELS.map((c) => interpolate(offsets, frames.map((f) => f[c]), { ease, clamp: true }));
  return (progress) => Object.fromEntries(CHANNELS.map((c, i) => [c, fns[i]!(progress)])) as unknown as PartPose;
};

interface Driver { name: string; host: HTMLElement; seek: (ms: number) => void; }

const markup = (scene: Parameters<typeof BrandScene>[0]['scene'], scale: number): string =>
  renderToStaticMarkup(<BrandScene scene={scene} scale={scale} />);

const box = (root: HTMLElement, name: string, html: string): HTMLElement => {
  const host = document.createElement('div');
  host.className = 'cell';
  host.dataset.driver = name;
  host.innerHTML = html;
  root.append(host);
  return host;
};

const partsOf = (svg: Element): Map<string, Element[]> => {
  const map = new Map<string, Element[]>();
  for (const el of svg.querySelectorAll('[data-motion-part]')) {
    const id = el.getAttribute('data-motion-part')!;
    map.set(id, [...(map.get(id) ?? []), el]);
  }
  return map;
};

const reference = (root: HTMLElement, brand: Brand, clip: MascotAnimation, loop: boolean, scale: number, name = 'waapi'): Driver => {
  const mascot = BRAND_FAMILY[brand].mascot!;
  const host = box(root, name, markup(mascotStage(mascot, clip)!, scale));
  const svg = host.querySelector('svg')!;
  const motion = mascot.motion!;
  const animations = [...(motion.ambient ? playClip(svg, motion, motion.ambient, true) : []), ...playClip(svg, motion, clip, loop)];
  for (const a of animations) a.pause();
  return { name, host, seek: (ms) => { for (const a of animations) a.currentTime = ms; } };
};

const sampled = (root: HTMLElement, name: string, brand: Brand, clip: MascotAnimation, loop: boolean, scale: number, make: InterpMaker | 'engine', viaAnimation = false): Driver => {
  const mascot = BRAND_FAMILY[brand].mascot!;
  const motion = mascot.motion!;
  const host = box(root, name, markup((window as unknown as { SAME_SCENE?: boolean }).SAME_SCENE ? mascotStage(mascot, clip)! : stageScene(mascot.variants[0].compose(), motion), scale));
  const parts = partsOf(host.querySelector('svg')!);
  if ((window as unknown as { PARK?: boolean }).PARK) { const used = new Set([...clip.tracks.map((t) => t.part), ...(clip.still ?? []), ...(motion.ambient?.tracks.map((t) => t.part) ?? [])]); for (const e of motion.effects ?? []) if (!used.has(e.id)) for (const el of parts.get(e.id) ?? []) el.setAttribute("display", "none"); }
  const pivots = motionPivots(motion);
  const effects = new Set((motion.effects ?? []).map((e) => e.id));
  const still = new Set(clip.still ?? []);
  const restOf = (part: string) => (effects.has(part) ? (still.has(part) ? 1 : 0) : 1);
  const layers = [...(motion.ambient ? [{ clip: motion.ambient, loop: true }] : []), { clip, loop }];
  const built = layers.map(({ clip: c, loop: l }) => {
    const compiled = compileClip(c, pivots);
    const tracks = c.tracks.filter((t) => pivots.has(t.part)).map((t, i) => {
      const pivot = pivots.get(t.part)! as [number, number];
      const interp = make === 'engine'
        ? (p: number) => sampleTrack(compiled.tracks[i]!, p * c.duration + (t.lag ?? 0), { duration: c.duration, loop: false, fill: 'hold' }, restOf(t.part))!
        : make(t, pivot, restOf(t.part), c);
      return { track: t, pivot, interp };
    });
    return { clip: c, loop: l, tracks };
  });
  const holders = new Map<Element, Animation>();
  const fading = new Set<string>();
  for (const layer of layers) for (const t of layer.clip.tracks) if (restOf(t.part) !== 1 || t.frames.some((f) => f.opacity !== undefined)) fading.add(t.part);
  const tracked = new Set(layers.flatMap((l) => l.clip.tracks.map((t) => t.part)));
  const write = (el: SVGElement, transform: string, opacity: string) => {
    if (!viaAnimation) {
      el.style.transform = transform;
      el.style.opacity = opacity;
      return;
    }
    if (!tracked.has(el.getAttribute('data-motion-part') ?? '')) {
      if (opacity === '1') el.removeAttribute('opacity');
      else if (opacity) el.setAttribute('opacity', opacity);
      return;
    }
    const held = holders.get(el);
    const part = el.getAttribute('data-motion-part') ?? '';
    if (!transform && !opacity && !tracked.has(part)) {
      held?.cancel();
      holders.delete(el);
      return;
    }
    const frame: Keyframe = { transform: transform || 'none', ...(fading.has(part) || still.has(part) ? { opacity } : {}) };
    const hint = (window as unknown as { HINT?: number }).HINT;
    const frames: Keyframe[] = hint ? [{ ...frame, offset: 0 }, { ...frame, offset: 0.999 }, { ...frame, transform: `${frame.transform === 'none' ? '' : frame.transform} scale(${hint})`, offset: 1 }] : [frame, frame];
    if (held) (held.effect as KeyframeEffect).setKeyframes(frames);
    else {
      const a = el.animate(frames, { duration: 1000, fill: 'both', composite: (window as unknown as { COMP?: CompositeOperation }).COMP ?? 'replace' });
      a.pause();
      holders.set(el, a);
    }
  };
  const seek = (ms: number) => {
    const styles = new Map<string, { transforms: string[]; opacity: number }>();
    for (const part of still) styles.set(part, { transforms: [], opacity: 1 });
    for (const layer of built) {
      for (const { track, pivot, interp } of layer.tracks) {
        const local = ms - (track.lag ?? 0);
        if (local < 0 || (!layer.loop && local >= layer.clip.duration)) continue;
        const progress = layer.loop ? (local % layer.clip.duration) / layer.clip.duration : local / layer.clip.duration;
        const pose = interp(progress);
        const rest = restOf(track.part);
        const style = styles.get(track.part) ?? { transforms: [], opacity: rest };
        style.transforms.push(poseTransform(pose, pivot));
        style.opacity += pose.opacity - rest;
        styles.set(track.part, style);
      }
    }
    for (const [id, els] of parts) {
      const style = styles.get(id) ?? (viaAnimation && tracked.has(id) ? { transforms: [], opacity: restOf(id) } : undefined);
      for (const el of els as (SVGElement)[]) write(el, style ? style.transforms.join(' ') : '', style ? String(Math.min(1, Math.max(0, style.opacity))) : '');
    }
  };
  return { name, host, seek };
};

const stageNative = (root: HTMLElement, brand: Brand, clip: MascotAnimation, loop: boolean, scale: number): Driver => {
  const mascot = BRAND_FAMILY[brand].mascot!;
  const motion = mascot.motion!;
  const host = box(root, 'stage-native', markup(stageScene(mascot.variants[0].compose(), motion), scale));
  const svg = host.querySelector('svg')!;
  const parts = partsOf(svg);
  const used = new Set([...clip.tracks.map((t) => t.part), ...(clip.still ?? []), ...(motion.ambient?.tracks.map((t) => t.part) ?? [])]);
  for (const e of motion.effects ?? []) {
    for (const el of parts.get(e.id) ?? []) {
      if (!used.has(e.id)) el.setAttribute('display', 'none');
      if ((clip.still ?? []).includes(e.id)) el.removeAttribute('opacity');
    }
  }
  const animations = [...(motion.ambient ? playClip(svg, motion, motion.ambient, true) : []), ...playClip(svg, motion, clip, loop)];
  for (const a of animations) a.pause();
  return { name: 'stage-native', host, seek: (ms) => { for (const a of animations) a.currentTime = ms; } };
};

let drivers: Driver[] = [];

const setup = (brand: Brand, clipId: string, scale: number, loop?: boolean): { duration: number; loop: boolean } => {
  const root = document.getElementById('root')!;
  for (const a of document.getAnimations()) a.cancel();
  root.innerHTML = '';
  const clip = BRAND_FAMILY[brand].mascot!.motion!.animations[clipId]!;
  const looping = loop ?? clip.loop;
  drivers = [
    reference(root, brand, clip, looping, scale),
    reference(root, brand, clip, looping, scale, 'waapi-again'),
    stageNative(root, brand, clip, looping, scale),
    sampled(root, 'engine-style', brand, clip, looping, scale, 'engine'),
    sampled(root, 'engine', brand, clip, looping, scale, 'engine', true),
    sampled(root, 'gsap', brand, clip, looping, scale, gsapInterp, true),
    sampled(root, 'motion', brand, clip, looping, scale, motionInterp, true),
  ];
  return { duration: clip.duration, loop: looping };
};

const seek = (ms: number): void => { for (const d of drivers) d.seek(ms); };

Object.assign(window, { harness: { setup, seek } });
