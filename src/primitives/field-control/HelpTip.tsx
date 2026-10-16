/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Icon } from '../Icon';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { Tooltip } from '../Tooltip';
import type { HelpTipProps } from './HelpTip.type';
import './HelpTip.css';

const keepLabel = (event: MouseEvent<HTMLElement>): void => event.preventDefault();

const HelpTip = (props: HelpTipProps) => {
  const { help } = props;
  const { fields } = useTesseraStrings();
  if (help == null || help === '') return null;
  return (
    <Tooltip content={help} className="help-tip">
      <span role="button" tabIndex={0} aria-label={fields.help} className="help-tip__mark" onClick={keepLabel}>
        <Icon name="circle-help" />
      </span>
    </Tooltip>
  );
};

export { HelpTip };
