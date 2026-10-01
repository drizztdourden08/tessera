/* @layer renderer-components @kind logic */
import type { AnimatedMascotProps } from '../AnimatedMascot.type';

const animatedMascotClass = (props: AnimatedMascotProps): string => {
  const { size = 'md', scale, className = '' } = props;
  return ['animated-mascot', scale === undefined ? `animated-mascot--${size}` : '', className].filter(Boolean).join(' ');
};

export { animatedMascotClass };
