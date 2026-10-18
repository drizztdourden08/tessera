/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

type HideTimer = RefObject<ReturnType<typeof setTimeout> | undefined>;

export type { HideTimer };
