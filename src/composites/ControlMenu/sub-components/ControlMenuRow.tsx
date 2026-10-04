/* @layer renderer-components @kind component */
import { useContext, useId } from 'react';
import { Box } from '../../../primitives/Box';
import { useHintTarget } from '../../../primitives/hint/useHintTarget';
import { Icon } from '../../../primitives/Icon';
import { Tooltip } from '../../../primitives/Tooltip';
import { Span } from '../../../primitives/text-elements';
import { ControlMenuContext } from '../behavior/control-menu-context';
import { matchesQuery } from '../behavior/matches-query';
import { ABOUT_ICON_SIZE } from '../ControlMenu.constants';
import type { ControlMenuRowProps } from '../ControlMenu.type';

const ControlMenuRow = (props: ControlMenuRowProps) => {
  const { label, hint, about, children } = props;
  const { query } = useContext(ControlMenuContext);
  const aboutId = useId();
  const hintHandlers = useHintTarget<HTMLElement>({ hint });
  if (!matchesQuery(label, query)) return null;
  const text = <Span tone="dim" className="control-menu__label">{label}</Span>;
  const described = about === undefined ? {} : { role: 'group', 'aria-label': label, 'aria-describedby': aboutId };

  return (
    <Box className="control-menu__row" {...hintHandlers}>
      {about === undefined ? text : (
        <Tooltip content={about} className="control-menu__about">
          {text}
          <Icon name="info" size={ABOUT_ICON_SIZE} className="control-menu__about-icon" />
          <Span id={aboutId} hidden>{about}</Span>
        </Tooltip>
      )}
      <Box className="control-menu__control" {...described}>{children}</Box>
    </Box>
  );
};

export { ControlMenuRow };
