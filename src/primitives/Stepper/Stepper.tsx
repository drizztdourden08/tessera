/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { lineLit } from './behavior/line-lit';
import { lineTone } from './behavior/line-tone';
import { motionKind } from './behavior/motion-kind';
import { stepStatus } from './behavior/step-status';
import { rootStyle } from './behavior/root-style';
import { useStepMotion } from './behavior/useStepMotion';
import { waveOf } from './behavior/wave-of';
import { StepperCompact } from './sub-components/StepperCompact';
import { StepperItem } from './sub-components/StepperItem';
import type { StepperProps } from './Stepper.type';
import './Stepper.css';

const Stepper = (props: StepperProps) => {
  const {
    steps, currentId, complete, orientation = 'horizontal', compact = false, tone, doneIcon = 'check', reserve = 'summaries', selectMode = 'navigate',
    labelPlacement = 'below', labelLines, dotVariant = 'filled', stepWidth, mediaSize, scroll = false, canSelect, onSelect,
    activeSubStepId, onSubStepSelect, label, className = '',
  } = props;
  const { stepper } = useTesseraStrings();
  const toggle = selectMode === 'toggle';
  const horizontal = orientation === 'horizontal';
  const current = toggle ? -1 : complete ? steps.length : Math.max(steps.findIndex((step) => step.id === currentId), 0);
  const statuses = steps.map((step, index) => stepStatus(step, index, current));
  const hasMedia = horizontal && steps.some((step) => step.media !== undefined);
  const motion = useStepMotion(current);
  const name = label ?? stepper.steps;
  if (compact) return <StepperCompact steps={steps} current={current} label={name} className={className} />;
  return (
    <Box
      as="nav"
      className={`stepper${className ? ` ${className}` : ''}`}
      style={rootStyle({ tone, stepWidth, mediaSize, labelLines })}
      data-orientation={orientation}
      data-label-at={horizontal && labelPlacement === 'above' ? 'above' : undefined}
      data-dot={dotVariant === 'ring' ? 'ring' : undefined}
      data-media={hasMedia ? '' : undefined}
      data-scroll={scroll ? '' : undefined}
      data-motion={motionKind(motion, current)}
      aria-label={name}
    >
      <Box as="ol" className="stepper__list">
        {steps.map((step, index) => {
          const status = statuses[index] ?? 'upcoming';
          return (
            <StepperItem
              key={step.id}
              step={step}
              number={index + 1}
              status={status}
              current={index === current}
              last={index === steps.length - 1}
              wave={waveOf(index, current, motion)}
              lineTone={lineTone(step, steps[index + 1], tone)}
              lineLit={lineLit(status, steps[index + 1], statuses[index + 1])}
              doneIcon={dotVariant === 'ring' ? undefined : (step.doneIcon ?? doneIcon) || undefined}
              reserveSummary={reserve === 'summaries'}
              reserveMedia={hasMedia}
              toggle={toggle}
              selectable={index !== current && (canSelect?.(step.id) ?? toggle)}
              onSelect={onSelect}
              activeSubStepId={activeSubStepId}
              onSubStepSelect={onSubStepSelect}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export { Stepper };
