/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { InputRenderers, RenderContext } from './renderers.type';
import type { SettingsInput } from '../SettingsRow.type';

const drawInput = (renderers: InputRenderers, input: SettingsInput, context: RenderContext): ReactNode =>
  (renderers[input.kind] as (given: SettingsInput, around: RenderContext) => ReactNode)(input, context);

export { drawInput };
