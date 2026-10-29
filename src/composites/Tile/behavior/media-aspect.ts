/* @layer renderer-components @kind logic */
import { POSITIVE_NUMBER } from './media-aspect.constants';

const positive = (part: string): boolean => POSITIVE_NUMBER.test(part) && Number(part) > 0;

const mediaAspect = (value: number | string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return Number.isFinite(value) && value > 0 ? String(value) : undefined;
  const parts = value.split('/').map((part) => part.trim());
  if (parts.length > 2 || !parts.every(positive)) return undefined;
  return parts.join(' / ');
};

export { mediaAspect };
