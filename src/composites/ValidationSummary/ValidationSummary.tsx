/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { Callout } from '../../primitives/Callout';
import { Icon } from '../../primitives/Icon';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span, Strong } from '../../primitives/text-elements';
import { useShowAll } from './behavior/useShowAll';
import { ValidationProblemRow } from './sub-components/ValidationProblemRow';
import { DEFAULT_MAX, TONE_ICON } from './ValidationSummary.constants';
import type { ValidationSummaryProps } from './ValidationSummary.type';
import './ValidationSummary.css';

const ValidationSummary = (props: ValidationSummaryProps) => {
  const { title, problems, max = DEFAULT_MAX, tone = 'danger', onFocusField, className } = props;
  const { items } = useTesseraStrings();
  const listRef = useRef<HTMLElement>(null);
  const cap = Math.max(1, max);
  const { all, showAll } = useShowAll(listRef, cap);
  if (problems.length === 0) return null;
  const shown = all ? problems : problems.slice(0, cap);
  const hidden = problems.length - shown.length;
  return (
    <Box role="alert" className="validation-summary-alert">
      <Callout tone={tone} icon={<Icon name={TONE_ICON[tone]} size={20} />} className={className ? `validation-summary ${className}` : 'validation-summary'}>
        <Strong className="validation-summary__title">{title ?? items.fixBeforeSaving(problems.length)}</Strong>
        <Span ref={listRef} role="list" className="validation-summary__list">
          {shown.map((problem) => <ValidationProblemRow key={problem.id} problem={problem} onFocusField={onFocusField} />)}
        </Span>
        {hidden > 0 && (
          <Button variant="ghost" size="sm" className="validation-summary__more" onClick={showAll}>
            {items.andMore(hidden)}
          </Button>
        )}
      </Callout>
    </Box>
  );
};

export { ValidationSummary };
