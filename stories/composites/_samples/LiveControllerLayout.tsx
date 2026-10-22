/* @layer stories @kind component */
import { ControllerLayout } from '../../../src/composites';
import type { ControllerLayoutVariant } from '../../../src/composites';
import { stickAt, triggerAt } from './controller-motion';
import { BUTTON_IDS, labelledSlots } from './controller-slots';
import { useAnimationTime } from './use-animation-time';

interface LiveControllerLayoutProps {
  variant?: ControllerLayoutVariant;
  className?: string;
}

const LiveControllerLayout = (props: LiveControllerLayoutProps) => {
  const { variant = 'offset', className } = props;
  const t = useAnimationTime();
  const turn = Math.floor(t * 1.5) % BUTTON_IDS.length;
  const slots = labelledSlots(variant, BUTTON_IDS.slice(turn, turn + 1));
  const left = stickAt(t, 'free');
  const right = stickAt(t + 1.4, 'roll');

  return (
    <ControllerLayout
      variant={variant}
      className={className}
      slots={{
        ...slots,
        'trigger.left': { ...slots['trigger.left'], pressed: false, value: triggerAt(t) },
        'trigger.right': { ...slots['trigger.right'], pressed: false, value: triggerAt(t + 1.1) },
        'stick.left': { x: left.x, y: left.y },
        'stick.right': { x: right.x * Math.min(1, t / 3), y: right.y * Math.min(1, t / 3) },
      }}
    />
  );
};

export { LiveControllerLayout };
