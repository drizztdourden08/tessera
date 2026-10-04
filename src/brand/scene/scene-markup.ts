/* @layer renderer-components @kind logic */
import type { BrandMarkPath, BrandSceneData, SceneNode } from '../brand.type';
import type { SceneMarkupOptions, SceneWriter as Writer } from './scene.type';
import { turnTransform } from './turn-transform';

const attr = (name: string, value: string | undefined): string => (value === undefined ? '' : ` ${name}="${value}"`);

const pathTag = (p: BrandMarkPath, w: Writer): string =>
  `<path fill="${w.ink(p.ink)}"${p.evenOdd ? ' fill-rule="evenodd"' : ''}${attr('fill-opacity', p.opacity?.toString())} d="${p.d}"/>`;

const nodeTag = (node: SceneNode, w: Writer): string => {
  if (node.kind === 'piece') {
    const { piece } = node;
    const art = `<svg width="${node.width}" height="${node.height}" viewBox="0 0 ${piece.w} ${piece.h}" preserveAspectRatio="none" overflow="visible"${w.crisp ? ' shape-rendering="crispEdges"' : ''}>${piece.paths.map((p) => pathTag(p, w)).join('')}</svg>`;
    return `<g${attr('transform', turnTransform(node))}>${art}</g>`;
  }
  const clipId = node.clip ? w.clipId() : undefined;
  const clip = node.clip && clipId ? `<clipPath id="${clipId}"><polygon points="${node.clip.map((p) => p.join(',')).join(' ')}"/></clipPath>` : '';
  const turn = node.turn ? turnTransform(node.turn) : undefined;
  return `${clip}<g${attr('transform', turn)}${attr('clip-path', clipId && `url(#${clipId})`)}${attr('opacity', node.hidden ? '0' : undefined)}>${node.children.map((c) => nodeTag(c, w)).join('')}</g>`;
};

const sceneMarkup = (scene: BrandSceneData, options: SceneMarkupOptions = {}): string => {
  const { idPrefix = 'scene', ink = (value: string) => value } = options;
  let clips = 0;
  const writer: Writer = { ink, crisp: scene.smooth !== true, clipId: () => `${idPrefix}-clip-${(clips += 1)}` };
  return scene.nodes.map((node) => nodeTag(node, writer)).join('');
};

export { sceneMarkup };
