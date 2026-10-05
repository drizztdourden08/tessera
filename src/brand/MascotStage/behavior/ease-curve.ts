/* @layer renderer-components @kind logic */
import { cubicBezier } from './cubic-bezier';

const curves = new Map<string, (t: number) => number>();

const steps = (count: number, start: boolean) => (t: number): number =>
  (t >= 1 ? 1 : (start ? Math.ceil(t * count) : Math.floor(t * count)) / count);

const parse = (spec: string): ((t: number) => number) => {
  const bezier = /^cubic-bezier\(([^)]+)\)$/.exec(spec);
  if (bezier) {
    const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = (bezier[1] ?? '').split(',').map(Number);
    return cubicBezier(x1, y1, x2, y2);
  }
  const stepped = /^steps\((\d+)(?:,\s*([\w-]+))?\)$/.exec(spec);
  if (stepped) return steps(Number(stepped[1]), stepped[2] === 'start' || stepped[2] === 'jump-start');
  return (t: number) => t;
};

const easeCurve = (spec: string): ((t: number) => number) => {
  const known = curves.get(spec);
  if (known) return known;
  const curve = parse(spec);
  curves.set(spec, curve);
  return curve;
};

export { easeCurve };
