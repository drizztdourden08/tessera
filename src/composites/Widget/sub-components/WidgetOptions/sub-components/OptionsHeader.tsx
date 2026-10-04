/* @layer renderer-components @kind component */
import { Icon } from '../../../../../primitives/Icon';
import { IconButton } from '../../../../../primitives/IconButton';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../../../primitives/text-elements';
import type { OptionsHeaderProps } from '../WidgetOptions.type';

const OptionsHeader = (props: OptionsHeaderProps) => {
  const { title, onReset } = props;
  const { widgets } = useTesseraStrings();
  return (
    <>
      <Span className="widget-options__title">{title}</Span>
      <IconButton size="xs" label={widgets.resetWidget} hint={{ label: widgets.resetWidget, description: widgets.resetHint }} onClick={onReset}>
        <Icon name="rotate-ccw" size={12} />
      </IconButton>
    </>
  );
};

export { OptionsHeader };
