/* @layer renderer-components @kind component */
import { Svg, SvgCircle, SvgPath } from '../../../primitives/Svg';
import { CHOICE_MARK } from './ChoiceMark.constants';
import type { ChoiceMarkProps } from './ChoiceMark.type';
import './ChoiceMark.css';

const { viewBox, centre, dot, ring, ringStroke, check, checkStroke } = CHOICE_MARK;

const ChoiceMark = (props: ChoiceMarkProps) => {
  const { kind, checked, className } = props;
  const classes = ['choice-mark', `choice-mark--${kind}`, className].filter(Boolean).join(' ');
  return (
    <Svg className={classes} data-on={checked ? '' : undefined} viewBox={viewBox} aria-hidden="true" focusable="false">
      <SvgCircle className="choice-mark__dot" cx={centre} cy={centre} r={dot} />
      {kind === 'check'
        ? <SvgPath className="choice-mark__line" d={check} pathLength={1} strokeWidth={checkStroke} />
        : <SvgCircle className="choice-mark__line" cx={centre} cy={centre} r={ring} pathLength={1} strokeWidth={ringStroke} />}
    </Svg>
  );
};

export { ChoiceMark };
