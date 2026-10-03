/* @layer renderer-components @kind logic */
import type { SettingsInput } from '../SettingsRow.type';
import { PART_HINTS } from './hint-rules.constants';

const hasPartHints = (input: SettingsInput): boolean => (PART_HINTS[input.kind] as (given: SettingsInput) => boolean)(input);

export { hasPartHints };
