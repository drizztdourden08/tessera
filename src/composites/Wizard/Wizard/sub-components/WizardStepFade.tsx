/* @layer renderer-components @kind component */
import { useLayoutEffect, useRef, useState } from 'react';
import { Box } from '../../../../primitives/Box';
import { useReducedMotion } from '../../../../primitives/dom/useReducedMotion';
import type { WizardFadeFrame, WizardStepFadeProps } from './WizardStepFade.type';
import './WizardStepFade.css';

const WizardStepFade = (props: WizardStepFadeProps) => {
  const { stepKey, direction, children } = props;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion(ref);
  const latest = useRef<WizardFadeFrame>({ key: stepKey, node: children });
  const [seenKey, setSeenKey] = useState(stepKey);
  const [leaving, setLeaving] = useState<WizardFadeFrame | null>(null);
  let out = leaving;
  if (seenKey !== stepKey) {
    out = reduced ? null : { key: seenKey, node: latest.current.node };
    setSeenKey(stepKey);
    setLeaving(out);
  }
  useLayoutEffect(() => {
    latest.current = { key: stepKey, node: children };
  });
  const shown = out ?? { key: stepKey, node: children };
  return (
    <Box
      ref={ref}
      key={shown.key}
      className="wizard-step-fade"
      data-phase={out ? 'out' : 'in'}
      data-direction={direction}
      inert={out !== null}
      onAnimationEnd={(event) => {
        if (out !== null && event.target === event.currentTarget) setLeaving(null);
      }}
    >
      {shown.node}
    </Box>
  );
};

export { WizardStepFade };
