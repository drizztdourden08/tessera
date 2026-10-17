/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import { readableInk } from '../../../primitives/hex-ink/readable-ink';
import { TEXT_TONES } from '../../../primitives/TextElement';
import type { TextTone } from '../../../primitives/TextElement';
import type { LogKindTone } from '../LogPanel.type';
import type { LogInk } from './log-ink.type';

const isTextTone = (tone: LogKindTone): tone is TextTone => (TEXT_TONES as readonly string[]).includes(tone);

const logInk = (tone: LogKindTone | undefined, fallback?: TextTone): LogInk => {
  if (tone === undefined) return { tone: fallback };
  if (isTextTone(tone)) return { tone };
  const ink = tone.startsWith('#') ? readableInk(tone) : `var(--c-tag-${tone})`;
  return ink === null ? { tone: fallback } : { className: 'log-panel__ink', style: { '--log-ink': ink } as CSSProperties };
};

export { logInk };
