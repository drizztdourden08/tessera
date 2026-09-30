/* @layer stories @kind constants */
import type { CSSProperties } from 'react';
import type { DemonstratorAxis } from '../_template/Demonstrator.type';
import type { Specimen } from './scale-stories.type';

const SPECIMEN_STYLE: Record<Specimen, (token: string) => CSSProperties> = {
  shadow: (token) => ({ boxShadow: `var(${token})` }),
  z: () => ({}),
  duration: (token) => ({ transitionDuration: `var(${token})` }),
  easing: (token) => ({ transitionTimingFunction: `var(${token})` }),
  transition: (token) => ({ transition: `var(${token})` }),
};

const SCALE_COLUMNS: readonly DemonstratorAxis<'value' | 'sample'>[] = [
  { key: 'value', label: 'Value' },
  { key: 'sample', label: 'Sample' },
];

export { SCALE_COLUMNS, SPECIMEN_STYLE };
