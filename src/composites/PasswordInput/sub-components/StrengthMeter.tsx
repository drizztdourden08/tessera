/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { LEVEL_FILL, MAX_SCORE, STRENGTH_SEGMENTS } from '../PasswordInput.constants';
import type { StrengthMeterProps } from './StrengthMeter.type';

const StrengthMeter = (props: StrengthMeterProps) => {
  const { score, level } = props;
  const { password } = useTesseraStrings();
  const fill = level === null ? 0 : LEVEL_FILL[level];
  const word = level === null ? undefined : password[level];
  return (
    <Box as="span" className="password-strength" data-level={level ?? undefined}>
      <Box as="span"
        className="password-strength__bar"
        role="meter"
        aria-label={password.strength}
        aria-valuemin={0}
        aria-valuemax={MAX_SCORE}
        aria-valuenow={level === null ? 0 : score}
        aria-valuetext={word}
      >
        {STRENGTH_SEGMENTS.map((segment) => (
          <Box as="span" key={segment} className="password-strength__segment" data-on={segment <= fill ? 'yes' : undefined} />
        ))}
      </Box>
      <Box as="span" className="password-strength__word" aria-hidden="true">{word}</Box>
    </Box>
  );
};

export { StrengthMeter };
