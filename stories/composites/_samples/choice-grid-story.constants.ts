/* @layer stories @kind data */
import type { ChoiceCell, ChoiceSection } from '../../../src/composites/ChoiceGrid';

const RAMP: readonly string[] = ['#1d2b53', '#3f4f9a', '#4870d8', '#88b0f8', '#c8dcff', '#f8f8f8'];

const RAMP_CELLS: readonly ChoiceCell[] = RAMP.map((hex, index) => ({ value: String(index), label: `Shade ${index + 1}, ${hex}` }));

const BRUSH_NAMES: readonly string[] = ['Square', 'Round', 'Diamond', 'Cross', 'Line', 'Dots', 'Spray', 'Dither'];

const BRUSH_SECTIONS: readonly ChoiceSection[] = [
  { id: 'basic', label: 'Basic', cells: BRUSH_NAMES.slice(0, 5).map((name) => ({ value: name, label: `${name} brush`, content: name })) },
  { id: 'texture', label: 'Texture', cells: BRUSH_NAMES.slice(5).map((name) => ({ value: name, label: `${name} brush`, content: name })) },
];

const PALETTE_SECTIONS: readonly ChoiceSection[] = [
  { id: 'skin', label: 'Skin', cells: ['#f0d0a8', '#d8a878', '#b86820', '#906040', '#584028'].map((hex) => ({ value: hex, label: hex })) },
  { id: 'sky', label: 'Sky', cells: ['#4870d8', '#88b0f8', '#c8dcff', '#1d2b53'].map((hex) => ({ value: hex, label: hex })) },
];

export { BRUSH_SECTIONS, PALETTE_SECTIONS, RAMP, RAMP_CELLS };
