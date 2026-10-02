/* @layer stories @kind types */
import type { LinkTone } from '../../../src/primitives';

interface RouterDemoRoute {
  to: string;
  label: string;
}

interface RouterDemoProps {
  routes: readonly RouterDemoRoute[];
  tone?: LinkTone;
}

export type { RouterDemoProps, RouterDemoRoute };
