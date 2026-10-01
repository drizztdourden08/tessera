/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { navLabels } from './behavior/nav-labels';
import { navMessage } from './behavior/nav-message';
import { WizardNavButtons } from './sub-components/WizardNavButtons';
import type { WizardNavProps } from './WizardNav.type';
import './WizardNav.css';

const WizardNav = (props: WizardNavProps) => {
  const { isFirst, isLast, canGoNext, busy = false, extra, onCancel, onBack, onNext, onFinish, className = '' } = props;
  const strings = useTesseraStrings();
  return (
    <Box className={`wizard-nav${className ? ` ${className}` : ''}`}>
      {extra != null && <Box className="wizard-nav__extra">{extra}</Box>}
      <Span tone="muted" className="wizard-nav__hint" data-busy={busy ? '' : undefined} aria-live="polite">{navMessage(props, strings)}</Span>
      <WizardNavButtons
        isFirst={isFirst}
        isLast={isLast}
        canGoNext={canGoNext}
        busy={busy}
        onCancel={onCancel}
        onBack={onBack}
        onNext={onNext}
        onFinish={onFinish}
        labels={navLabels(props, strings)}
      />
    </Box>
  );
};

export { WizardNav };
