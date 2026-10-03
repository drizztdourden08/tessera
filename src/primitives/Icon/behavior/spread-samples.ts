/* @layer renderer-components @kind logic */
import type { SamplePoint, SampleShape, SampleSpan } from '../sub-components/IconEffectHost.type';

const round = (value: number): number => Math.round(value * 100) / 100;

const spansOf = (shapes: readonly SampleShape[]): SampleSpan[] => {
  let start = 0;
  return shapes.map((shape, index) => {
    const span = { shape, index, start };
    start += shape.length;
    return span;
  }).filter((span) => span.shape.length > 0);
};

const spreadSamples = (shapes: readonly SampleShape[], count: number): SamplePoint[] => {
  const spans = spansOf(shapes);
  const last = spans.at(-1);
  if (!last || count <= 0) return [];
  const step = (last.start + last.shape.length) / count;
  return Array.from({ length: count }, (_, i) => {
    const distance = (i + 0.5) * step;
    const span = spans.find((each) => distance < each.start + each.shape.length) ?? last;
    const point = span.shape.pointAt(Math.min(1, (distance - span.start) / span.shape.length));
    return { x: round(point.x), y: round(point.y), shape: span.index };
  });
};

export { spreadSamples };
