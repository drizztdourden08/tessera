/* @layer renderer-components @kind component */
import { ScrollArea } from '../../../primitives/ScrollArea';
import { disabledReason } from '../../../primitives/field-control/disabled-reason';
import { isDisabled } from '../../../primitives/field-control/is-disabled';
import { DisabledOverlay } from '../../DisabledOverlay';
import type { WidgetBodyProps } from './WidgetBody.type';
import './WidgetBody.css';

const WidgetBody = (props: WidgetBodyProps) => {
  const { padding = 'sm', fill = false, disabled, onOpenSettings, children } = props;
  return (
    <DisabledOverlay active={isDisabled(disabled)} message={disabledReason(disabled)} contained onOpenSettings={onOpenSettings} className="widget__off">
      <ScrollArea
        axis="both"
        scrollbar="slim"
        fade={false}
        className={`widget__content widget__content--pad-${padding}`}
        data-fill={fill || undefined}
      >
        {children}
      </ScrollArea>
    </DisabledOverlay>
  );
};

export { WidgetBody };
