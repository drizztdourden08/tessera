/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../../../primitives/Box';
import { useHintTarget } from '../../../../../primitives/hint/useHintTarget';
import { Icon } from '../../../../../primitives/Icon';
import { Tooltip } from '../../../../../primitives/Tooltip';
import { Span } from '../../../../../primitives/text-elements';
import { ABOUT_ICON_SIZE } from '../WidgetOptions.constants';
import type { OptionRowProps } from '../WidgetOptions.type';

const OptionRow = (props: OptionRowProps) => {
  const { label, hint, about, children } = props;
  const aboutId = useId();
  const hintHandlers = useHintTarget<HTMLElement>({ hint });
  const text = <Span tone="dim" className="widget-option-row__label">{label}</Span>;
  const described = about === undefined ? {} : { role: 'group', 'aria-label': label, 'aria-describedby': aboutId };

  return (
    <Box className="widget-option-row" {...hintHandlers}>
      {about === undefined ? text : (
        <Tooltip content={about} className="widget-option-row__about">
          {text}
          <Icon name="info" size={ABOUT_ICON_SIZE} className="widget-option-row__about-icon" />
          <Span id={aboutId} hidden>{about}</Span>
        </Tooltip>
      )}
      <Box className="widget-option-row__control" {...described}>{children}</Box>
    </Box>
  );
};

export { OptionRow };
