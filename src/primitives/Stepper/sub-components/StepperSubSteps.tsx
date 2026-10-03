/* @layer renderer-components @kind component */
import { Badge } from '../../Badge';
import { Box } from '../../Box';
import { Pressable } from '../../Pressable';
import { Span } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { StepperSubStepsProps } from './StepperSubSteps.type';
import './StepperSubSteps.css';

const StepperSubSteps = (props: StepperSubStepsProps) => {
  const { step, enabled, activeId, onSelect } = props;
  const { stepper } = useTesseraStrings();
  return (
    <Box as="ul" className="stepper-sub-steps" aria-label={stepper.sections(step.label)}>
      {(step.subSteps ?? []).map((sub) => (
        <Box as="li" key={sub.id}>
          <Pressable
            className="stepper-sub-steps__item"
            aria-current={sub.id === activeId ? 'true' : undefined}
            disabled={!enabled || !onSelect}
            onClick={() => onSelect?.(step.id, sub.id)}
          >
            <Span className="stepper-sub-steps__label">{sub.label}</Span>
            {sub.count !== undefined && sub.count > 0 && (
              <Badge variant="inline" value={sub.count} color="primary" translucent label={stepper.changedCount(sub.count)} />
            )}
          </Pressable>
        </Box>
      ))}
    </Box>
  );
};

export { StepperSubSteps };
