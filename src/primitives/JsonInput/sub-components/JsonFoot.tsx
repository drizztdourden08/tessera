/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { jsonSummary } from '../behavior/json-summary';
import type { JsonFootProps } from '../JsonInput.type';

const JsonFoot = ({ id, problem, value, onFormat, disabled }: JsonFootProps) => {
  const strings = useTesseraStrings();
  return (
    <Box className="json-input__foot">
      <Text id={id} variant="caption" tone={problem ? 'danger' : 'dim'} className="json-input__status">
        {problem ? problem.message : jsonSummary(strings, value)}
      </Text>
      <Button size="sm" variant="ghost" icon={<Icon name="braces" />} disabled={disabled === true || onFormat === undefined} onClick={onFormat}>
        {strings.options.format}
      </Button>
    </Box>
  );
};

export { JsonFoot };
