/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import { Glyph } from '../../../primitives/Glyph';
import type { ReactNode } from 'react';
import type { GlyphName } from '../../../primitives/Glyph';

const menuGlyph = (name: GlyphName): ReactNode => createElement(Glyph, { name });

export { menuGlyph };
