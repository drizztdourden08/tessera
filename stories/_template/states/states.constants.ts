/* @layer stories @kind data */
import type { PseudoState, StateEntry, StateKey } from './states.type';

const FORCE_ATTRIBUTE = 'data-force-state';

const FORCEABLE_PSEUDO = /(?<![:\\])(:(?:hover|focus-visible|focus-within|focus|active))(?![\w-])/g;

const FORCED_WITH: Readonly<Record<PseudoState, readonly PseudoState[]>> = {
  hover: ['hover'],
  focus: ['focus', 'focus-within'],
  'focus-visible': ['focus', 'focus-visible', 'focus-within'],
  'focus-within': ['focus-within'],
  active: ['active'],
};

const STATE: Readonly<Record<StateKey, StateEntry>> = {
  idle: { name: 'Idle' },
  hover: { name: 'Hover', pseudo: 'hover' },
  focus: { name: 'Focus', pseudo: 'focus-visible' },
  active: { name: 'Active', pseudo: ['hover', 'active'] },
  selected: { name: 'Selected', props: { selected: true } },
  checked: { name: 'Checked', props: { checked: true } },
  open: { name: 'Open', props: { open: true } },
  readOnly: { name: 'Read only', props: { readOnly: true } },
  loading: { name: 'Loading', props: { loading: true } },
  error: { name: 'Error', props: { invalid: true } },
  disabled: { name: 'Disabled', props: { disabled: true } },
};

export { FORCE_ATTRIBUTE, FORCEABLE_PSEUDO, FORCED_WITH, STATE };
