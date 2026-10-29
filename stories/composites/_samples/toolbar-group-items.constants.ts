/* @layer stories @kind data */
import type { ToolbarItem } from '../../../src/composites';

const noop = (): void => undefined;

const tool = (id: string, label: string, icon: string): ToolbarItem => ({ kind: 'button', id, label, icon, onSelect: noop });

const groupItems = (grouped: boolean): ToolbarItem[] => [
  { kind: 'separator', id: 'draw', label: 'Draw', ...(grouped ? { priority: 3 } : {}) },
  tool('pencil', 'Pencil', 'pixel-pencil'),
  tool('eraser', 'Eraser', 'pixel-eraser'),
  tool('bucket', 'Fill', 'pixel-fill-bucket'),
  { kind: 'separator', id: 'shapes', label: 'Shapes', ...(grouped ? { priority: 2 } : {}) },
  tool('line', 'Line', 'pixel-shape-line'),
  tool('rect', 'Rectangle', 'pixel-shape-rect'),
  tool('ellipse', 'Ellipse', 'pixel-shape-ellipse'),
  { kind: 'separator', id: 'view', label: 'View', ...(grouped ? { priority: 1 } : {}) },
  tool('grid', 'Grid', 'pixel-grid'),
  tool('zoom', 'Zoom', 'pixel-zoom'),
];

export { groupItems };
