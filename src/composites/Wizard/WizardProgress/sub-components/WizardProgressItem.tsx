/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { Pressable } from '../../../../primitives/Pressable';
import { Span } from '../../../../primitives/text-elements';
import { useTesseraStrings } from '../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { itemView } from '../behavior/item-view';
import { WizardStepDot } from './WizardStepDot';
import { WizardSubSteps } from './WizardSubSteps';
import type { WizardProgressItemProps } from './WizardProgressItem.type';

const WizardProgressItem = (props: WizardProgressItemProps) => {
  const { step, number, state, last, selectable, onSelect, activeSubStepId, onSubStepSelect } = props;
  const { wizard } = useTesseraStrings();
  const view = itemView(props, wizard);
  return (
    <Box as="li" className="wizard-progress__item" data-state={state}>
      <Pressable
        className="wizard-progress__step"
        aria-label={view.name}
        aria-current={view.current ? 'step' : undefined}
        disabled={view.disabled}
        onClick={() => onSelect?.(step.id)}
      >
        <WizardStepDot number={number} />
        <Span className="wizard-progress__text">
          <Span className="wizard-progress__label">{step.label}</Span>
          {view.summary && <Span className="wizard-progress__summary" title={view.summary}>{view.summary}</Span>}
        </Span>
      </Pressable>
      {view.subSteps.length > 0 && (
        <WizardSubSteps
          step={step}
          enabled={view.current || selectable}
          activeId={view.current ? activeSubStepId : undefined}
          onSelect={onSubStepSelect}
        />
      )}
      {!last && <Span className="wizard-progress__link" data-done={view.done ? '' : undefined} aria-hidden />}
    </Box>
  );
};

export { WizardProgressItem };
