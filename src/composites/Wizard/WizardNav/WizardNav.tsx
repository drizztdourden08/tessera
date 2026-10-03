/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ButtonRow } from '../../../primitives/ButtonRow';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { navLooks } from './behavior/nav-looks';
import { navMessage } from './behavior/nav-message';
import { WizardNavButtons } from './sub-components/WizardNavButtons';
import type { WizardNavProps } from './WizardNav.type';
import './WizardNav.css';

const WizardNav = (props: WizardNavProps) => {
  const { isFirst, isLast, canGoNext, busy = false, extra, buttons, onCancel, onBack, onNext, onFinish, className = '' } = props;
  const strings = useTesseraStrings();
  const lead = (
    <>
      {extra != null && <Box className="wizard-nav__extra">{extra}</Box>}
      <Span tone="muted" className="wizard-nav__hint" data-busy={busy ? '' : undefined} aria-live="polite">{navMessage(props, strings)}</Span>
    </>
  );
  return (
    <ButtonRow variant="bar" lead={lead} className={`wizard-nav${className ? ` ${className}` : ''}`}>
      <WizardNavButtons
        isFirst={isFirst}
        isLast={isLast}
        canGoNext={canGoNext}
        busy={busy}
        onCancel={onCancel}
        onBack={onBack}
        onNext={onNext}
        onFinish={onFinish}
        looks={navLooks(buttons, isLast, strings)}
      />
    </ButtonRow>
  );
};

export { WizardNav };
