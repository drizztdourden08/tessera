/* @layer stories @kind logic */
import { FEED_HISTORY } from './performance-feed.constants';
import type { PerformanceFrame } from './performance-feed.type';

const clamp = (value: number, low: number, high: number): number => Math.min(high, Math.max(low, value));

const revert = (value: number, base: number): number => base + (value - base) * 0.6;

const push = (series: readonly number[], value: number): number[] => [...series.slice(1 - FEED_HISTORY), Math.round(value * 10) / 10];

const roller = (start: number) => {
  let seed = start;
  const roll = (): number => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296 - 0.5;
  };
  return { roll, seed: () => seed };
};

const nextFrame = (frame: PerformanceFrame): PerformanceFrame => {
  const { roll, seed } = roller(frame.seed);
  const tick = frame.tick + 1;
  const load = tick % 15 >= 11 ? 1 : 0;
  const cpu = clamp(revert(frame.cpu, 32 + load * 40) + roll() * 10, 4, 99);
  const gpu = clamp(revert(frame.gpu, 55 + load * 35) + roll() * 8, 10, 99);
  const heat = clamp(revert(frame.heat, 40 + gpu * 0.45) + roll() * 1.5, 40, 95);
  const fps = clamp(142 - load * (55 + roll() * 40) + roll() * 6, 24, 165);
  const download = clamp(revert(frame.download.at(-1) ?? 20, 24) + roll() * 22, 0, 96);
  const upload = clamp(revert(frame.upload.at(-1) ?? 4, 5) + roll() * 4, 0, 18);
  const processes = frame.processes.map((process, index) => ({
    ...process,
    value: Math.max(0.02, Math.round((process.value + roll() * (index === 0 ? 0.3 : 0.06)) * 100) / 100),
  }));
  return {
    tick, cpu, gpu, heat, processes,
    fps: push(frame.fps, fps), download: push(frame.download, download), upload: push(frame.upload, upload),
    seed: seed(),
  };
};

export { nextFrame };
