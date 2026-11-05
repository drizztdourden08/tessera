/* @layer renderer-components @kind logic */
import { MAX_PNG_BYTES, MAX_SVG_BYTES } from '../IconPicker.constants';
import { fileKind } from './file-kind';
import { stripBom } from './strip-bom';
import { isSvgText } from './is-svg-text';
import { readDataUrl } from './read-data-url';
import type { IconFileResult } from './read-icon-file.type';

const readSvg = async (file: File): Promise<IconFileResult> => {
  if (file.size > MAX_SVG_BYTES) return { problem: 'svgTooLarge' };
  const svg = stripBom(await file.text()).trim();
  return isSvgText(svg) ? { value: { kind: 'svg', svg } } : { problem: 'notSvg' };
};

const readPng = async (file: File): Promise<IconFileResult> => {
  if (file.size > MAX_PNG_BYTES) return { problem: 'pngTooLarge' };
  return { value: { kind: 'png', dataUrl: await readDataUrl(file) } };
};

const readIconFile = async (file: File): Promise<IconFileResult> => {
  const kind = fileKind(file);
  if (kind === null) return { problem: 'notSupported' };
  try {
    return await (kind === 'svg' ? readSvg(file) : readPng(file));
  } catch {
    return { problem: 'unreadable' };
  }
};

export { readIconFile };
