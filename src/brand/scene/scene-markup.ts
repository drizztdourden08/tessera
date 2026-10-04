/* @layer renderer-components @kind logic */
import type { BrandMarkPath, BrandSceneData, SceneGroupNode, SceneNode } from '../brand.type';
import { GOO_COLOURS, GOO_MATRIX, GOO_REGION } from './goo.constants';
import type { SceneMarkupOptions, SceneWriter as Writer } from './scene.type';
import { turnTransform } from './turn-transform';

const attr = (name: string, value: string | undefined): string => (value === undefined ? '' : ` ${name}="${value}"`);

const pathTag = (p: BrandMarkPath, w: Writer): string =>
  `<path fill="${w.ink(p.ink)}"${p.evenOdd ? ' fill-rule="evenodd"' : ''}${attr('fill-opacity', p.opacity?.toString())} d="${p.d}"/>`;

const gooTag = (node: SceneGroupNode, id: string | undefined): string => {
  if (node.goo === undefined || id === undefined) return '';
  const { x, y, width, height } = GOO_REGION;
  return `<filter id="${id}" x="${x}" y="${y}" width="${width}" height="${height}" color-interpolation-filters="${GOO_COLOURS}"><feGaussianBlur stdDeviation="${node.goo}"/><feColorMatrix values="${GOO_MATRIX}"/></filter>`;
};

const nodeTag = (node: SceneNode, w: Writer): string => {
  if (node.kind === 'piece') {
    const { piece } = node;
    const art = `<svg width="${node.width}" height="${node.height}" viewBox="0 0 ${piece.w} ${piece.h}" preserveAspectRatio="none" overflow="visible"${w.crisp ? ' shape-rendering="crispEdges"' : ''}>${piece.paths.map((p) => pathTag(p, w)).join('')}</svg>`;
    return `<g${attr('transform', turnTransform(node))}>${art}</g>`;
  }
  const clipId = node.clip ? w.clipId() : undefined;
  const clip = node.clip && clipId ? `<clipPath id="${clipId}"><polygon points="${node.clip.map((p) => p.join(',')).join(' ')}"/></clipPath>` : '';
  const gooId = node.goo === undefined ? undefined : w.gooId();
  const turn = node.turn ? turnTransform(node.turn) : undefined;
  return `${clip}${gooTag(node, gooId)}<g${attr('transform', turn)}${attr('clip-path', clipId && `url(#${clipId})`)}${attr('filter', gooId && `url(#${gooId})`)}>${node.children.map((c) => nodeTag(c, w)).join('')}</g>`;
};

const sceneMarkup = (scene: BrandSceneData, options: SceneMarkupOptions = {}): string => {
  const { idPrefix = 'scene', ink = (value: string) => value } = options;
  let clips = 0;
  let goos = 0;
  const writer: Writer = { ink, crisp: scene.smooth !== true, clipId: () => `${idPrefix}-clip-${(clips += 1)}`, gooId: () => `${idPrefix}-goo-${(goos += 1)}` };
  return scene.nodes.map((node) => nodeTag(node, writer)).join('');
};

export { sceneMarkup };
