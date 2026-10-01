/* @layer stories @kind logic */
import type { TesseraPart } from '../../../src/primitives';
import { PART_SNIPPETS } from './provider-snippets.constants';

const overridesBlock = (parts: readonly TesseraPart[]): string =>
  `const OVERRIDES: TesseraOverrides = {\n${parts.map((part) => `  ${PART_SNIPPETS[part].entry},\n`).join('')}};`;

const providerSnippet = (parts: readonly TesseraPart[]): string[] => [
  ...parts.flatMap((part) => PART_SNIPPETS[part].define ?? []),
  overridesBlock(parts),
];

export { providerSnippet };
