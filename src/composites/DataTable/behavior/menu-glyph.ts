/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import { Glyph } from '../../../primitives/Glyph';
import type { ReactElement } from 'react';
import type { GlyphName } from '../../../primitives/Glyph';

const menuGlyph = (name: GlyphName): ReactElement => createElement(Glyph, { name });

export { menuGlyph };
