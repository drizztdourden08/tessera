/* @layer renderer-components @kind types */
import type { ReactNode, Ref } from 'react';
import type { BrandFit, WindowTitleBarInstance } from '../WindowTitleBar.type';

interface WindowTitleBarBrandProps {
  title: ReactNode;
  logo?: string;
  instance?: WindowTitleBarInstance | null;
  fit: BrandFit;
  ref?: Ref<HTMLElement>;
}

export type { WindowTitleBarBrandProps };
