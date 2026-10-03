/* @layer renderer-components @kind logic */
import type { SettingsInputOf } from '../SettingsRow.type';

const sliderText = (input: SettingsInputOf<'slider'>): string => input.formatValue?.(input.value) ?? String(input.value);

export { sliderText };
