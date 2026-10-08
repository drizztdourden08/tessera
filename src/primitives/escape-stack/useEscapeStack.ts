/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import { escapeStackOf } from './escape-stack-of';
import { useEscapeLayer } from './useEscapeLayer';
import type { EscapeLayer, EscapeStack } from './escape-stack.type';

const ignore = (): void => undefined;

const pageDocument = (): Document | undefined => (typeof document === 'undefined' ? undefined : document);

const useEscapeStack = (layer?: EscapeLayer): EscapeStack => {
  const doc = useTesseraOverride('portalDocument') ?? pageDocument();
  const registered = layer !== undefined && layer.active !== false;
  useEscapeLayer(registered ? doc : null, layer?.level ?? 'popover', layer?.onEscape ?? ignore);
  return useMemo(() => escapeStackOf(doc), [doc]);
};

export { useEscapeStack };
