/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { TermList } from '../../../primitives/TermList';
import { H3 } from '../../../primitives/Title';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WizardReviewProps } from './WizardReview.type';
import './WizardReview.css';

const WizardReview = (props: WizardReviewProps) => {
  const { wizard } = useTesseraStrings();
  const { sections, onEdit, editLabel = wizard.edit, disabled = false, className = '' } = props;
  return (
    <Box className={`wizard-review${className ? ` ${className}` : ''}`}>
      {sections.map((section) => (
        <Box as="section" key={section.stepId} className="wizard-review__block" aria-label={section.title}>
          <Box className="wizard-review__head">
            <H3 className="wizard-review__title">{section.title}</H3>
            {onEdit && (
              <Button
                variant="ghost"
                icon={<Icon name="pencil" />}
                disabled={disabled}
                aria-label={wizard.editStep(section.title)}
                onClick={() => onEdit(section.stepId)}
              >
                {editLabel}
              </Button>
            )}
          </Box>
          <TermList items={section.rows} className="wizard-review__rows" />
        </Box>
      ))}
    </Box>
  );
};

export { WizardReview };
