/* @layer renderer-components @kind component */
import './HintLine.css';
import { useHint } from '../hint/useHint';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../text-elements';
import type { HintLineProps } from './HintLine.type';

const HintLine = (props: HintLineProps) => {
  const { hint: given, idle, lines = 2, className } = props;
  const scoped = useHint();
  const { common } = useTesseraStrings();
  const hint = given === undefined ? scoped : given;
  const classes = ['hint-line', lines === 1 && 'hint-line--1', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-live="polite">
      {hint ? (
        <>
          <Span className="hint-line__label">{hint.label}</Span>{' '}
          <Span tone="muted" className="hint-line__description">{hint.description}</Span>
        </>
      ) : (
        <Span tone="muted" className="hint-line__idle">{idle ?? common.hintIdle}</Span>
      )}
    </div>
  );
};

export { HintLine };
