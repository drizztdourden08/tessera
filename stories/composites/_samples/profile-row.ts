/* @layer stories @kind util */
import type { ManagedListRowParts } from '../../../src/composites';
import { PROFILE_GAMES, PROFILE_TEMPLATES } from './profile-samples.constants';
import type { SampleProfile } from './profile-samples.type';

const labelOf = (list: readonly { value: string; label: string }[], value: string): string =>
  list.find((entry) => entry.value === value)?.label ?? value;

const profileRow = (profile: SampleProfile): ManagedListRowParts => ({
  meta: `${labelOf(PROFILE_GAMES, profile.game)} · ${labelOf(PROFILE_TEMPLATES, profile.template)}`,
});

export { profileRow };
