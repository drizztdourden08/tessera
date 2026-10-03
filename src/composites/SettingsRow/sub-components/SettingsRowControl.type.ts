/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Hint } from '../../../primitives/hint/hint.type';

interface SettingsRowControlProps {
  bubble: boolean;
  current?: Hint;
  children: ReactNode;
}

export type { SettingsRowControlProps };
