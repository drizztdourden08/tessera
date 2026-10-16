/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface StudioParts {
  root: HTMLElement;
  body: HTMLElement;
  editor: HTMLElement;
}

interface StudioRefs {
  root: RefObject<HTMLElement | null>;
  body: RefObject<HTMLElement | null>;
  editor: RefObject<HTMLElement | null>;
}

export type { StudioParts, StudioRefs };
