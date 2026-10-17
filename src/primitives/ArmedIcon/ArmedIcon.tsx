/* @layer renderer-components @kind component */
import { Svg, SvgGroup, SvgPath } from '../Svg';
import { ARMED_ICON_BOX, ARMED_ICON_STROKE, ARMED_ICON_THIN_STROKE, ARMED_ICONS } from './ArmedIcon.constants';
import type { ArmedIconProps } from './ArmedIcon.type';
import './ArmedIcon.css';

const ArmedIcon = (props: ArmedIconProps) => {
  const { name, armed = false, size = 16, className } = props;

  return (
    <Svg
      className={['armed-icon', `armed-icon--${name}`, className].filter(Boolean).join(' ')}
      data-armed={armed || undefined}
      viewBox={ARMED_ICON_BOX}
      width={size}
      height={size}
      strokeWidth={ARMED_ICON_STROKE}
      aria-hidden="true"
      focusable="false"
    >
      {ARMED_ICONS[name].map((part) => (
        <SvgGroup key={part.part} className={`armed-icon__${part.part}`} strokeWidth={part.thin ? ARMED_ICON_THIN_STROKE : undefined}>
          {part.d.map((d) => <SvgPath key={d} d={d} />)}
        </SvgGroup>
      ))}
    </Svg>
  );
};

export { ArmedIcon };
