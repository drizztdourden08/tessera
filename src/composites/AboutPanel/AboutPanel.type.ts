/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface AboutPanelRow {
  label: string;
  value: ReactNode;
}

type AboutPanelCopy = (text: string) => Promise<boolean> | boolean;

interface AboutPanelProps {
  title: ReactNode;
  logo?: string;
  rows: readonly AboutPanelRow[];
  copyText?: string | null;
  copyLabel?: string;
  onCopy?: AboutPanelCopy;
  legal?: ReactNode;
  className?: string;
}

export type { AboutPanelCopy, AboutPanelProps, AboutPanelRow };
