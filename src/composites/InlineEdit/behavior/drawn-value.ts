/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';

const drawnValue = (value: string, renderValue: ((value: string) => ReactNode) | undefined): ReactNode =>
  value === '' || !renderValue ? undefined : renderValue(value);

export { drawnValue };
