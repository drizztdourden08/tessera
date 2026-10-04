/* @layer stories @kind types */
import type { PreviewUsage } from './preview-usage.type';

interface PreviewChoice {
  name: string;
  chosen?: boolean;
  why: string;
}

interface PreviewChoicesProps {
  choices: readonly PreviewChoice[];
}

interface PreviewUsageViewProps {
  name: string;
  usage: PreviewUsage;
}

interface PreviewListProps {
  title: string;
  lines: readonly string[];
}

export type { PreviewChoice, PreviewChoicesProps, PreviewListProps, PreviewUsageViewProps };
