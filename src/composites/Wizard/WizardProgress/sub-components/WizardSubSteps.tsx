/* @layer renderer-components @kind component */
import { Badge } from '../../../../primitives/Badge';
import { Box } from '../../../../primitives/Box';
import { Pressable } from '../../../../primitives/Pressable';
import { Span } from '../../../../primitives/text-elements';
import { useTesseraStrings } from '../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WizardSubStepsProps } from './WizardSubSteps.type';
import './WizardSubSteps.css';

const WizardSubSteps = (props: WizardSubStepsProps) => {
  const { step, enabled, activeId, onSelect } = props;
  const { wizard } = useTesseraStrings();
  return (
    <Box as="ul" className="wizard-sub-steps" aria-label={wizard.sections(step.label)}>
      {(step.subSteps ?? []).map((sub) => {
        const active = sub.id === activeId;
        const body = (
          <>
            <Span className="wizard-sub-steps__label">{sub.label}</Span>
            {sub.count !== undefined && sub.count > 0 && (
              <Badge variant="inline" value={sub.count} color="primary" translucent label={wizard.changedCount(sub.count)} />
            )}
          </>
        );
        return (
          <Box as="li" key={sub.id}>
            <Pressable
              className="wizard-sub-steps__item"
              aria-current={active ? 'true' : undefined}
              disabled={!enabled || !onSelect}
              onClick={() => onSelect?.(step.id, sub.id)}
            >
              {body}
            </Pressable>
          </Box>
        );
      })}
    </Box>
  );
};

export { WizardSubSteps };
