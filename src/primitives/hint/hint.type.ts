/* @layer renderer-components @kind types */
import type { DOMAttributes, ReactNode } from 'react';

interface Hint {
  label: string;
  description: string;
}

type HintReport = (hint: Hint | null) => void;

type HintSourceReport = (source: string, hint: Hint | null) => void;

interface HintEntry {
  source: string;
  hint: Hint;
}

interface HintHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: (event: { target: EventTarget | null }) => void;
  onBlur: () => void;
}

interface UseHintReportParams<K extends string> {
  hintOf: (key: K) => Hint | undefined;
  onHint?: HintReport;
}

interface HintReporter<K extends string> {
  handlersFor: (key: K) => HintHandlers;
}

type HintTargetHandlers<E extends Element> = Pick<DOMAttributes<E>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'>;

interface UseHintTargetParams<E extends Element> {
  hint?: Hint;
  onHint?: HintReport;
  handlers?: HintTargetHandlers<E>;
}

interface HintScopeProps {
  children: ReactNode;
}

export type {
  Hint, HintEntry, HintHandlers, HintReport, HintReporter, HintScopeProps, HintSourceReport, HintTargetHandlers,
  UseHintReportParams, UseHintTargetParams,
};
