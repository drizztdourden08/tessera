/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';

const hasBadge = (badge: ReactNode): boolean => badge !== undefined && badge !== null && badge !== false && badge !== true && badge !== '';

export { hasBadge };
