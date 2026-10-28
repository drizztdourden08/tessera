/* @layer stories @kind hook */
import { useState } from 'react';
import type { ChoiceCell, ChoiceSection } from '../../../src/composites/ChoiceGrid';
import { Image } from '../../../src/primitives';
import { BRUSH_BASIC, BRUSH_PATTERNS, BRUSH_TEXTURE, SELECTION_PATTERN } from './brush-patterns.constants';
import { brushPatternUri } from './brush-pattern-uri';

interface BrushCells {
  sections: readonly ChoiceSection[];
  addFromSelection: () => string;
}

const cellOf = (name: string, rows: readonly string[]): ChoiceCell => ({
  value: name,
  label: `${name} brush`,
  content: <Image src={brushPatternUri(rows)} width={24} height={24} fit="integer" pixelated alt="" />,
});

const useBrushCells = (): BrushCells => {
  const [custom, setCustom] = useState<readonly string[]>([]);
  const named = (names: readonly string[]) => names.map((name) => cellOf(name, BRUSH_PATTERNS[name] ?? []));
  const sections: ChoiceSection[] = [
    { id: 'basic', label: 'Basic', cells: named(BRUSH_BASIC) },
    { id: 'texture', label: 'Texture', cells: named(BRUSH_TEXTURE) },
  ];
  if (custom.length > 0) sections.push({ id: 'custom', label: 'Custom', cells: custom.map((name) => cellOf(name, SELECTION_PATTERN)) });
  const addFromSelection = (): string => {
    const name = `Custom ${custom.length + 1}`;
    setCustom([...custom, name]);
    return name;
  };
  return { sections, addFromSelection };
};

export { useBrushCells };
