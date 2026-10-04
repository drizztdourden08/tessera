/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { FieldControlContext } from '../../../primitives/field-control/field-control-context';
import { useHint } from '../../../primitives/hint/useHint';
import { Small } from '../../../primitives/text-elements';
import { COMPACT_CONTROL } from '../SettingsRow.constants';
import { SettingsRowHintText } from './SettingsRowHintText';
import type { SettingsRowControlProps } from './SettingsRowControl.type';

const SettingsRowControl = (props: SettingsRowControlProps) => {
  const { bubble, handlers, pointed, children } = props;
  const anchorRef = useRef<HTMLDivElement>(null);
  const shown = useHint() ?? pointed;
  if (!bubble) return <Box className="settings-row__control" {...handlers}>{children}</Box>;
  return (
    <Box ref={anchorRef} className="settings-row__control" {...handlers}>
      <FieldControlContext.Provider value={COMPACT_CONTROL}>{children}</FieldControlContext.Provider>
      {shown !== undefined && (
        <Anchored anchorRef={anchorRef} placement="bottom-end" layer="tooltip" className="settings-row__bubble">
          <Small role="status">
            <SettingsRowHintText hint={shown} />
          </Small>
        </Anchored>
      )}
    </Box>
  );
};

export { SettingsRowControl };
