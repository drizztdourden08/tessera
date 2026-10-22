/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { currentIndex } from './behavior/current-index';
import { faceIcon } from './behavior/face-icon';
import { isSelectable } from './behavior/is-selectable';
import { lineLit } from './behavior/line-lit';
import { lineTone } from './behavior/line-tone';
import { motionKind } from './behavior/motion-kind';
import { stepStatus } from './behavior/step-status';
import { rootAttrs } from './behavior/root-attrs';
import { rootStyle } from './behavior/root-style';
import { useStepMotion } from './behavior/useStepMotion';
import { waveOf } from './behavior/wave-of';
import { StepperCompact } from './sub-components/StepperCompact';
import { StepperItem } from './sub-components/StepperItem';
import type { StepperProps } from './Stepper.type';
import './Stepper.css';

const Stepper = (props: StepperProps) => {
  const { steps, orientation = 'horizontal', compact = false, tone, reserve = 'summaries', onSelect, activeSubStepId, onSubStepSelect, label, className = '' } = props;
  const { stepper } = useTesseraStrings();
  const current = currentIndex(props);
  const motion = useStepMotion(current);
  const name = label ?? stepper.steps;
  if (compact) return <StepperCompact steps={steps} current={Math.max(current, 0)} label={name} className={className} />;
  const statuses = steps.map((step, index) => stepStatus(step, index, current));
  const hasMedia = orientation === 'horizontal' && steps.some((step) => step.media !== undefined);
  return (
    <Box
      as="nav"
      className={`stepper${className ? ` ${className}` : ''}`}
      style={rootStyle(props)}
      data-orientation={orientation}
      {...rootAttrs(props, hasMedia)}
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
              doneIcon={faceIcon(step, props)}
              reserveSummary={reserve === 'summaries'}
              reserveMedia={hasMedia}
              toggle={props.selectMode === 'toggle'}
              selectable={isSelectable(props, index, current, step.id)}
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
