/* @layer renderer-components @kind logic */
import { isValidElement } from 'react';
import type { ReactNode } from 'react';
import { JSON_INDENT, NO_ERROR } from '../LoadError.constants';

const stringified = (error: object): string => {
  try {
    return JSON.stringify(error, null, JSON_INDENT);
  } catch {
    return String(error);
  }
};

const errorText = (error: Error): string => (error.stack?.includes(error.message) ? error.stack : error.message);

const rawError = (error: unknown): ReactNode => {
  if (NO_ERROR.has(error)) return null;
  if (error instanceof Error) return errorText(error);
  if (typeof error === 'string' || isValidElement(error)) return error;
  return typeof error === 'object' && error !== null ? stringified(error) : String(error);
};

export { rawError };
