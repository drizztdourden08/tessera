/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BrandApp } from '../../brand/brand.type';

interface AboutPanelRow {
  label: string;
  value: ReactNode;
}

interface AboutPanelProps {
  title: string;
  brand?: BrandApp;
  logo?: string;
  rows: readonly AboutPanelRow[];
  copyText?: string | null;
  copyLabel?: string;
  legal?: ReactNode;
  className?: string;
}

export type { AboutPanelProps, AboutPanelRow };
