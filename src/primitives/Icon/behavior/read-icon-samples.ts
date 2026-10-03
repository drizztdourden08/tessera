/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../dom/owner-window';
import { ICON_EFFECT } from '../sub-components/IconEffectHost.constants';
import type { IconSamples, SampleShape } from '../sub-components/IconEffectHost.type';
import { spreadSamples } from './spread-samples';

const isPainted = (shape: SVGGeometryElement): boolean => {
  if (shape.closest(ICON_EFFECT.unpainted)) return false;
  const style = ownerWindowOf(shape).getComputedStyle(shape);
  return style.fill !== 'none' || style.stroke !== 'none';
};

const shapeIn = (toUser: DOMMatrix, shape: SVGGeometryElement): SampleShape | null => {
  const screen = shape.getScreenCTM();
  if (!screen) return null;
  const toSvg = toUser.multiply(screen);
  const own = shape.getTotalLength();
  const stretch = Math.sqrt(Math.abs(toSvg.a * toSvg.d - toSvg.b * toSvg.c));
  return {
    length: own * stretch,
    pointAt: (share) => {
      const point = shape.getPointAtLength(share * own);
      return new DOMPoint(point.x, point.y).matrixTransform(toSvg);
    },
  };
};

const readIconSamples = (svg: SVGSVGElement): IconSamples | null => {
  const screen = svg.getScreenCTM();
  const box = svg.viewBox.baseVal;
  if (!screen || box.width <= 0 || box.height <= 0) return null;
  const toUser = screen.inverse();
  const shapes = [...svg.querySelectorAll<SVGGeometryElement>(ICON_EFFECT.shapes)]
    .filter(isPainted)
    .map((shape) => shapeIn(toUser, shape))
    .filter((shape): shape is SampleShape => shape !== null);
  const points = spreadSamples(shapes, ICON_EFFECT.samples);
  if (points.length === 0) return null;
  return { viewBox: `${box.x} ${box.y} ${box.width} ${box.height}`, span: Math.min(box.width, box.height), points };
};

export { readIconSamples };
